package com.skyline.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/household")
public class HouseholdRestController {
    private HouseholdRepository householdRepository;

    @Autowired
    HouseholdRestController(HouseholdRepository householdRepository){
        this.householdRepository = householdRepository;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{communityID}/register", consumes = {"application/json"})
    ResponseEntity<Object> add(@PathVariable String communityID, @RequestBody Household input){
        Household houseResult = householdRepository.save(new Household(input.name, input.admin, input.email, input.username, Password.hashPassword(input.password), communityID));
        return new ResponseEntity<Object>(houseResult, HttpStatus.OK);
    }

    //TODO Auth
    @RequestMapping(method = RequestMethod.POST, value = "/{communityID}/authentication")
    ResponseEntity<Object> auth(@PathVariable String communityID, @RequestBody Household input){
        Household result = householdRepository.findByCommunityIDAndUsername(communityID, input.username);
        if(!Password.checkPassword(input.password, result.password)){
            result = null;
        }
        return new ResponseEntity<Object>(result, HttpStatus.OK);

    }

    @RequestMapping(method = RequestMethod.GET, value = "/{communityID}/profile/{name}", headers="Accept=application/json")
    ResponseEntity<Object> getByName(@PathVariable String communityID, @PathVariable String name){
        Household result = this.householdRepository.findByCommunityIDAndUsername(communityID, name);
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{communityID}/profileID/{id}", headers="Accept=application/json")
    ResponseEntity<Object> getById(@PathVariable String communityID,  @PathVariable String id){
        Household result = this.householdRepository.findByCommunityIDAndId(communityID, id);
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{communityID}/members", headers="Accept=application/json")
    ResponseEntity<Object> getCommunityMemebers(@PathVariable String communityID){
        List<Household> result = this.householdRepository.findAllByCommunityID(communityID);
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    //TESTING
    @RequestMapping(method = RequestMethod.GET, value = "/profile/all", headers="Accept=application/json")
    ResponseEntity<Object> getAll(){
        List<Household> result = this.householdRepository.findAll();
        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }
}
