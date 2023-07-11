// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Gallery{

        string[] imageurl;

        struct Rating {
        string imghash;
        uint8 rating;
    }

    mapping (string => Rating[]) ratingList;
    mapping (address => string[]) public  imageUrl;//dynamic array to store url


   function addImage(string calldata url) external {
        //  imageUrl[_user].push(url);//creating dynamic array to add url of the file 
         imageurl.push(url);
     }

          function getImage() public view returns (string[] memory) {
        return imageurl;
    }

         function getImg(address _user) public view returns (string[] memory) {
        return imageUrl[_user];
    }


    function addRating(string memory _imghash, uint8 _rating) public {
        ratingList[_imghash].push(Rating(_imghash, _rating));
    }


    function getRatings(string memory _imghash) public view returns (Rating[] memory) {
        return ratingList[_imghash];
    }

}