package com.skyline.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/household")
public class HouseholdRestController {
    private HouseholdRepository householdRepository;

    @Autowired
    HouseholdRestController(HouseholdRepository householdRepository){
        this.householdRepository = householdRepository;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{communityID}/register")
    ResponseEntity<Object> add(@PathVariable String communityID, @RequestBody Household input){
        Household result = householdRepository.save(new Household(input.name, input.communityID, input.admin, input.email, input.username, input.password));
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    //TODO Auth
    @RequestMapping(method = RequestMethod.POST, value = "/{communityID}/authentication")
    ResponseEntity<Object> auth(@PathVariable String communityID, @RequestBody Household input){
        Household result = householdRepository.save(new Household(input.name, input.communityID, input.admin, input.email, input.username, input.password));
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/profileName/{name}", headers="Accept=application/json")
    ResponseEntity<Object> getByName(@PathVariable String name){
        Household result = this.householdRepository.findByUsername(name);
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/profileID/{id}", headers="Accept=application/json")
    ResponseEntity<Object> getById(@PathVariable String id){
        Household result = this.householdRepository.findById(id);
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{communityID}/members", headers="Accept=application/json")
    ResponseEntity<Object> getCommunityMemebers(@PathVariable String communityID){
        Household result = this.householdRepository.findAllByCommunityID(communityID);
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    //TESTING
    @RequestMapping(method = RequestMethod.GET, value = "/profile/all", headers="Accept=application/json")
    ResponseEntity<Object> getAll(){
        List<Household> result = this.householdRepository.findAll();
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }
}
