package com.skyline.api;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommunityRepository extends MongoRepository<Community, String> {
    public Community findCommunitiesByName(String name);
    public Community findCommunitiesById(String id);
}
