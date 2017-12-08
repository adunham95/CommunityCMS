package com.skyline.api;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface HouseholdRepository extends MongoRepository<Household, String>{
    public Household findById(String id);
    public Household findByUsername(String username);
    public List<Household> findAllByCommunityID(String communityID);
}
