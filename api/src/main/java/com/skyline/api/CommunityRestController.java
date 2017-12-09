package com.skyline.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.util.Collection;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/community")
public class CommunityRestController {
    private CommunityRepository communityRepository;
    private EventRepository eventRepository;

    @Autowired
    CommunityRestController(CommunityRepository communityRepository, EventRepository eventRepository){
        this.communityRepository = communityRepository;
        this.eventRepository = eventRepository;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/new", headers="Accept=application/json")
    ResponseEntity<Object> add(@RequestBody Community input){
        Community result = communityRepository.save(new Community(input.name, input.city, input.state));
        if(result == null){
            throw new CommunityException("Could not create new community");
        }
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/profileName/{name}", headers="Accept=application/json")
    ResponseEntity<Object> getByName(@PathVariable String name){
        Community result = this.communityRepository.findCommunitiesByName(name);
        if(result == null){
            throw new CommunityException("Could not retrieve community");
        }
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/profileID/{id}", headers="Accept=application/json")
    ResponseEntity<Object> getById(@PathVariable String id){
        Community result = this.communityRepository.findCommunitiesByid(id);
        if(result == null){
            throw new CommunityException("Could not retrieve community");
        }
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/profile/all", headers="Accept=application/json")
    ResponseEntity<Object> getAll(){
        List<Community> result = this.communityRepository.findAll();
        if(result == null){
            throw new CommunityException("Could not get all communities");
        }
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/events/all", headers="Accept=application/json")
    ResponseEntity<Object> getEvents(@PathVariable String id){
        Community result = this.communityRepository.findCommunitiesByid(id);
        if(result == null){
            throw new CommunityException("Could not retrieve Events");
        }
        return new ResponseEntity<Object>(result.events, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{id}/events/new", headers="Accept=application/json")
    ResponseEntity<Object> saveEvent(@PathVariable String id, @RequestBody Event input){
        Community commResult = this.communityRepository.findCommunitiesByid(id);
        if(commResult == null){
            throw new CommunityException("Could not find community");
        }
        commResult.setEvents(new Event(input.name, input.description, input.startDate, input.createdBy));
        Community result = this.communityRepository.save(commResult);
        if(result == null){
            throw new CommunityException("Could not add events");
        }
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }





}
