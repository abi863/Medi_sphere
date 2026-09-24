package com.medisphere.backend.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.medisphere.backend.model.Alert;
import com.medisphere.backend.model.Vital;
import com.medisphere.backend.repository.VitalRepository;
import com.medisphere.backend.service.AlertEngine;
import com.medisphere.backend.service.AlertService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(
        name = "medisphere.simulation.kafka-enabled",
        havingValue = "true",
        matchIfMissing = false
)
public class VitalEventConsumer {

    private static final Logger log =
            LoggerFactory.getLogger(VitalEventConsumer.class);

    private final VitalRepository vitalRepository;
    private final ObjectMapper objectMapper;
    private final AlertEngine alertEngine;
    private final AlertService alertService;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public VitalEventConsumer(
            VitalRepository vitalRepository,
            ObjectMapper objectMapper,
            AlertEngine alertEngine,
            AlertService alertService,
            KafkaTemplate<String, String> kafkaTemplate) {

        this.vitalRepository = vitalRepository;
        this.objectMapper = objectMapper;
        this.alertEngine = alertEngine;
        this.alertService = alertService;
        this.kafkaTemplate = kafkaTemplate;
    }

    @KafkaListener(
            topics = KafkaConfig.TOPIC_VITALS,
            groupId = "medisphere-group"
    )
    public void consumeVitalTelemetry(String message) {

        try {

            log.info(
                    "[KAFKA CONSUMER] Ingested real-time patient telemetry: {}",
                    message
            );

            Vital vital =
                    objectMapper.readValue(message, Vital.class);

            // Evaluate vital status
            vital.evaluateStatus();

            // Store vital in MongoDB
            vitalRepository.save(vital);

            // Run Alert Engine
            String alertMessage =
                    alertEngine.evaluateVital(vital);

            // If abnormal condition detected
            if (alertMessage != null) {

                // Create Alert object
                Alert alert = new Alert(
                        vital.getPatientId(),
                        vital.getStatus(),
                        alertMessage
                );

                // Save alert in MongoDB
                alertService.saveAlert(alert);

                log.warn(
                        "[ALERT DATABASE] Alert saved for patient {}",
                        vital.getPatientId()
                );

                // Create Kafka alert payload
                String alertPayload = String.format(
                        "{\"patientId\":\"%s\",\"severity\":\"%s\",\"message\":\"%s\"}",
                        vital.getPatientId(),
                        vital.getStatus(),
                        alertMessage
                );

                // Publish alert to Kafka
                kafkaTemplate.send(
                        KafkaConfig.TOPIC_ALERTS,
                        vital.getPatientId(),
                        alertPayload
                );

                log.warn(
                        "[ALERT ENGINE] Clinical alert generated: {}",
                        alertPayload
                );
            }

        } catch (Exception e) {

            log.error(
                    "Failed to process real-time vital telemetry: {}",
                    e.getMessage(),
                    e
            );
        }
    }

    @KafkaListener(
            topics = KafkaConfig.TOPIC_ALERTS,
            groupId = "medisphere-alert-group"
    )
    public void consumeClinicalAlert(String message) {

        log.warn(
                "[KAFKA ALERT CONSUMER] Clinical alert received: {}",
                message
        );
    }
}