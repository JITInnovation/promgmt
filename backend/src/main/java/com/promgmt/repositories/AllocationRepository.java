package com.promgmt.repositories;

import com.promgmt.models.Allocation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;

public interface AllocationRepository extends MongoRepository<Allocation, String> {

    @Query("{ 'user.id': ?0, 'assignmentDate': { '$lt': ?2 }, 'endDate': { '$gt': ?1 } }")
    List<Allocation> findOverlappingAllocations(String userId, Date startDate, Date endDate);

    List<Allocation> findByProjectId(String projectId);

    List<Allocation> findByUserId(String userId);
}
