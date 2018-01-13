pragma solidity ^0.4.18;

contract Coursetro {
    
   string fName;
   uint age;
   event instructor( string name, uint age);

   function setInstructor(string _fName, uint _age) public {
       fName = _fName;
       age = _age;
       instructor(fname, age);
   }
   
   function getInstructor() view public returns (string, uint) {
       return (fName, age);
   }
   
}