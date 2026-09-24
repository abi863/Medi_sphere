package com.medisphere.backend.service;

import com.medisphere.backend.model.Vital;
import org.springframework.stereotype.Service;

@Service
public class AlertEngine {

    public String evaluateVital(Vital vital) {

        // Critical conditions
        if (vital.getHeartRate() > 125) {
            return "CRITICAL: Heart rate is above 125 bpm";
        }

        if (vital.getHeartRate() < 50) {
            return "CRITICAL: Heart rate is below 50 bpm";
        }

        if (vital.getSystolicBp() > 175) {
            return "CRITICAL: Systolic blood pressure is above 175 mmHg";
        }

        if (vital.getSpo2() < 88) {
            return "CRITICAL: SpO2 is below 88%";
        }

        // Attention conditions
        if (vital.getHeartRate() > 105) {
            return "ATTENTION: Heart rate is above 105 bpm";
        }

        if (vital.getSystolicBp() > 150) {
            return "ATTENTION: Systolic blood pressure is above 150 mmHg";
        }

        if (vital.getSpo2() < 92) {
            return "ATTENTION: SpO2 is below 92%";
        }

        if (vital.getTemperature() > 101.5) {
            return "ATTENTION: Temperature is above 101.5°F";
        }

        // No alert
        return null;
    }

    public boolean hasAlert(Vital vital) {
        return evaluateVital(vital) != null;
    }
}