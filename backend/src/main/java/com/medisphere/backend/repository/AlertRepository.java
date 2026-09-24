package com.medisphere.backend.repository;

import com.medisphere.backend.model.Alert;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AlertRepository extends MongoRepository<Alert, String> {

    List<Alert> findByPatientIdOrderByTimestampDesc(String patientId);
}