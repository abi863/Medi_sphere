package com.medisphere.backend.controller;

import com.medisphere.backend.model.Alert;
import com.medisphere.backend.service.AlertService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "http://localhost:4200")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    // Get all alerts for a patient
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Alert>> getPatientAlerts(
            @PathVariable String patientId) {

        return ResponseEntity.ok(
                alertService.getAlertsByPatientId(patientId)
        );
    }

    // Get all alerts
    @GetMapping
    public ResponseEntity<List<Alert>> getAllAlerts() {

        return ResponseEntity.ok(
                alertService.getAllAlerts()
        );
    }

    // Acknowledge an alert
    @PutMapping("/{id}/acknowledge")
    public ResponseEntity<Void> acknowledgeAlert(
            @PathVariable String id) {

        alertService.acknowledgeAlert(id);

        return ResponseEntity.ok().build();
    }
}