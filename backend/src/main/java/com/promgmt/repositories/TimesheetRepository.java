package com.promgmt.repositories;

import com.promgmt.models.Timesheet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface TimesheetRepository extends MongoRepository<Timesheet, String> {
    List<Timesheet> findByUserIdAndWeekStartDate(String userId, LocalDate weekStartDate);
    void deleteByUserIdAndWeekStartDate(String userId, LocalDate weekStartDate);
}
