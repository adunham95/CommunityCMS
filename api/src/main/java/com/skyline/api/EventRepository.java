package com.skyline.api;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    public List<Event> findAllByCommunityID(String communityID);
    public Event findByCommunityIDAndId(String communityID, String id);
    public Event findAllByCommunityIDAndStartDateIsAfter(String communityID, Date dateAfter);
}
