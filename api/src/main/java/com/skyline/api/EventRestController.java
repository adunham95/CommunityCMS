package com.skyline.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/event")
public class EventRestController {
    private EventRepository eventRepository;

    @Autowired
    EventRestController(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/new", headers="Accept=application/json")
    ResponseEntity<Object> add(@RequestBody Event input){
        Event result = eventRepository.save(new Event(input.name, input.communityID, input.description, input.startDate, input.createdBy));
        if(result == null){
            throw new CommunityException("Could not create event");
        }
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{communityID}/all", headers="Accept=application/json")
    ResponseEntity<Object> getEvents(@PathVariable String communityID){
        List<Event> result = this.eventRepository.findAllByCommunityID(communityID);
        if(result == null){
            throw new CommunityException("Could not retrieve community");
        }
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{communityID}", headers="Accept=application/json")
    @ResponseBody
    ResponseEntity<Object> getEvent(@PathVariable String communityID, @RequestParam String id){
        Event result = this.eventRepository.findByCommunityIDAndId(communityID, id);
        if(result == null){
            throw new CommunityException("Could not retrieve community. ID:" + id + ".");
        }
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    //Testing
    @RequestMapping(method = RequestMethod.GET, value = "/all", headers="Accept=application/json")
    ResponseEntity<Object> getAll(){
        List<Event> result = this.eventRepository.findAll();
        if(result == null){
            throw new CommunityException("Could not retrieve events");
        }
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }
}
