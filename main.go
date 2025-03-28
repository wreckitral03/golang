package main

import "fmt"

func main() {
	fmt.Println("Hello, ninjas!")
	fmt.Println("Testing trial push")
	//strings
	var nameOne string = "mario"
	var nameTwo = "luigi"
	var nameThree string

	fmt.Println(nameOne, nameTwo, nameThree)

	nameOne = "peach"
	nameThree = "bowser"

	fmt.Println(nameOne, nameTwo, nameThree)

	nameFour := "yoshi"

	fmt.Println(nameFour)

	// ints
	var ageOne int = 20
	var ageTwo = 30
	ageThree := 40

	fmt.Println(ageOne, ageTwo, ageThree)

	// bits & memory
	var numOne int8 = 25
	var numTwo int8 = -128
	var numThree uint8 = 25
	var scoreOne float32

	var scoreOne float32 = 25.98
	var scoreTwo float64 = 85436523462354654265246.7
	scoreThree := 1.5

}
