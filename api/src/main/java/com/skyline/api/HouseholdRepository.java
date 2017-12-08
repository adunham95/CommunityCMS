package com.skyline.api;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface HouseholdRepository extends MongoRepository<Household, String>{
    public Household findByCommunityIDAndId(String communityID, String id);
    public Household findByCommunityIDAndUsername(String communityID, String username);
    public List<Household> findAllByCommunityID(String communityID);
}
