package com.skyline.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/community")
public class CommunityRestController {
    private CommunityRepository communityRepository;
    private String response;

    @Autowired
    CommunityRestController(CommunityRepository communityRepository){
        this.communityRepository = communityRepository;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/new", headers="Accept=application/json")
    ResponseEntity<Object> add(@RequestBody Community input){
        Community result = communityRepository.save(new Community(input.name, input.city, input.state));
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/profileName/{name}", headers="Accept=application/json")
    ResponseEntity<Object> getByName(@PathVariable String name){
        Community result = this.communityRepository.findCommunitiesByName(name);
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/profileID/{id}", headers="Accept=application/json")
    ResponseEntity<Object> getById(@PathVariable String id){
        Community result = this.communityRepository.findCommunitiesByid(id);
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/profile/all", headers="Accept=application/json")
    ResponseEntity<Object> getAll(){
        List<Community> result = this.communityRepository.findAll();
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

}
