package helpers

import (
	"fmt"
	"strings"
)

type Token struct{
	Key string
	Value string
	IndexOffset []byte
}

type TokenDelimiter struct{
	Key string
	Delimiter string
	Length int8
}

const (
	T_BRACKET_DELIMITER string = "BRACKET DELIMITER"
)

var delimiters = []TokenDelimiter {
	{ Key: "T_OPEN_BRACKET", Delimiter: "{#", Length: 2 },
	{ Key: "T_CLOSE_BRACKET", Delimiter: "{!", Length: 2 },
	{ Key: "T_SELF_CLOSE_BRACKET", Delimiter: "!}", Length: 2},
}

func TokenizeString(inputString string) []Token {
	var tokens []Token

	//Tokenize Steps
	//Split string by new lines
	//Split line by spaces
	//Pull component syntax from line
	//Put in token list

	splitString := strings.Split(inputString, "\n")

	if len(splitString) > 1{
		for s := range splitString{
			findDelimiters(splitString[s], delimiters)
		}

		return tokens
	}

	findDelimiters(splitString[0], delimiters)


	return tokens
}

func findDelimiters(inputString string, delimiters []TokenDelimiter) []Token{
	var tokens []Token

	splitInput := strings.SplitAfter(inputString, delimiters[2].Delimiter)

	for i := range splitInput{
		for d := range delimiters{
			delimiter := delimiters[d]
			
			trimmedString := strings.Trim(splitInput[i], " ")

			if !strings.Contains(splitInput[i], delimiter.Delimiter){
				continue
			}
	
			stringRunes := []rune(trimmedString)

			delimiterStartIndex := strings.Index(trimmedString, delimiter.Delimiter)
			delimiterEndIndex := delimiterStartIndex + int(delimiter.Length)
	
			foundDelimiter := string(stringRunes[delimiterStartIndex:delimiterEndIndex])

			fmt.Printf("Start Index: %d, End Index: %d, Value: %s \n", delimiterStartIndex, delimiterEndIndex, foundDelimiter)
		}
	}

	return tokens
}

func createToken(key string, value string, offset []byte) Token{
	return Token{
		Key: key,
		Value: value,
		IndexOffset: offset,
	}
}