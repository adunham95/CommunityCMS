package com.skyline.api;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface HouseholdRepository extends MongoRepository<Household, String>{
    public Household findByCommunityIDAndUsername(String communityID, String username);
    public Household findByCommunityIDAndId(String communityID, String id);
    public Household findByCommunityIDAndName(String communityID, String name);
    public List<Household> findAllByCommunityID(String communityID);

}
