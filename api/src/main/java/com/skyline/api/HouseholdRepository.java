package com.skyline.api;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface HouseholdRepository extends MongoRepository<Household, String>{
    public Household findById(String id);
    public Household findByUsername(String username);
    public Household findAllByCommunityID(String communityID);
}
