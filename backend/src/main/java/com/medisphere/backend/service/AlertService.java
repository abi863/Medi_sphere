package com.medisphere.backend.service;

import com.medisphere.backend.model.Alert;
import com.medisphere.backend.repository.AlertRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertService {

    private final AlertRepository alertRepository;

    public AlertService(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    public Alert saveAlert(Alert alert) {
        return alertRepository.save(alert);
    }

    public List<Alert> getAlertsByPatientId(String patientId) {
        return alertRepository.findByPatientIdOrderByTimestampDesc(patientId);
    }

    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    public void acknowledgeAlert(String id) {
        alertRepository.findById(id).ifPresent(alert -> {
            alert.setAcknowledged(true);
            alertRepository.save(alert);
        });
    }
}