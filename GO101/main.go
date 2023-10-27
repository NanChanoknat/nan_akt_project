package main

import (
	"fmt"
	//impor package from folder calculator
	"example.com/go-test/calculator"
)

func main() {
	fmt.Println("Test import package culculator")

	var num1 float64
	num1 = 10
	var num2 float64
	num2 = 10

	


	fmt.Println("Plus: ", calculator.Plus(num1, num2))
	fmt.Println("Minus: ", calculator.Minus(num1, num2))
	fmt.Println("Multiply: ", calculator.Multiply(num1, num2))
	fmt.Println("Divied: ", calculator.Divied(num1, num2))
	

}
