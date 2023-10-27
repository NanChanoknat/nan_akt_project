package calculator

import "testing"


func TestPlus(t *testing.T) {
	var num1 float64
	num1 = 10
	var num2 float64
	num2 = 10
    result := Plus(num1, num2)

    expected := 20

    if result != float64(expected) {
        t.Errorf("Test failed: expected %#v, got %#v", expected, result)
    }
}

func TestMinus(t *testing.T) {
	var num1 float64
	num1 = 10
	var num2 float64
	num2 = 10
    result := Minus(num1, num2)

    expected := 0

    if result != float64(expected) {
        t.Errorf("Test failed: expected %#v, got %#v", expected, result)
    }
}

func TestMultiply(t *testing.T) {
	var num1 float64
	num1 = 10
	var num2 float64
	num2 = 10
    result := Multiply(num1, num2)

    expected := 100

    if result != float64(expected) {
        t.Errorf("Test failed: expected %#v, got %#v", expected, result)
    }
}

func TestDivied(t *testing.T) {
	var num1 float64
	num1 = 10
	var num2 float64
	num2 = 10
    result := Divied(num1, num2)

    expected := 20

    if result != float64(expected) {
        t.Errorf("Test failed: expected %#v, got %#v", expected, result)
    }
}