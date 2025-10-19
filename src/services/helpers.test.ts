/** @format */

import { describe, it, expect } from 'vitest'
import { generateUserInitials, formatAmount, generatePascalCase, sentenceCase } from './helpers'

describe('generateUserInitials', () => {
  it('should return initials for a full name', () => {
    expect(generateUserInitials('John Doe')).toBe('JD')
    expect(generateUserInitials('Jane Smith')).toBe('JS')
  })

  it('should return single initial for a single name', () => {
    expect(generateUserInitials('John')).toBe('J')
    expect(generateUserInitials('Jane')).toBe('J')
  })

  it('should return first and last initials for names with multiple words', () => {
    expect(generateUserInitials('John Middle Doe')).toBe('JD')
    expect(generateUserInitials('Mary Jane Watson')).toBe('MW')
  })

  it('should return empty string for empty input', () => {
    expect(generateUserInitials('')).toBe('')
  })

  it('should handle names with extra whitespace', () => {
    expect(generateUserInitials('  John   Doe  ')).toBe('JD')
  })

  it('should convert initials to uppercase', () => {
    expect(generateUserInitials('john doe')).toBe('JD')
    expect(generateUserInitials('jane smith')).toBe('JS')
  })
})

describe('formatAmount', () => {
  it('should format positive numbers with 2 decimal places', () => {
    expect(formatAmount(1234.56)).toBe('1,234.56')
    expect(formatAmount(1000)).toBe('1,000.00')
    expect(formatAmount(0.5)).toBe('0.50')
  })

  it('should format zero correctly', () => {
    expect(formatAmount(0)).toBe('0.00')
  })

  it('should format negative numbers correctly', () => {
    expect(formatAmount(-1234.56)).toBe('-1,234.56')
    expect(formatAmount(-1000)).toBe('-1,000.00')
  })

  it('should handle large numbers', () => {
    expect(formatAmount(1234567.89)).toBe('1,234,567.89')
    expect(formatAmount(1000000)).toBe('1,000,000.00')
  })

  it('should round numbers to 2 decimal places', () => {
    expect(formatAmount(1234.567)).toBe('1,234.57')
    expect(formatAmount(1234.564)).toBe('1,234.56')
  })

  it('should format small decimal numbers', () => {
    expect(formatAmount(0.01)).toBe('0.01')
    expect(formatAmount(0.001)).toBe('0.00')
  })
})

describe('generatePascalCase', () => {
  it('should convert snake_case to PascalCase', () => {
    expect(generatePascalCase('hello_world')).toBe('Hello World')
    expect(generatePascalCase('user_name')).toBe('User Name')
    expect(generatePascalCase('first_last_name')).toBe('First Last Name')
  })

  it('should handle single words', () => {
    expect(generatePascalCase('hello')).toBe('Hello')
    expect(generatePascalCase('world')).toBe('World')
  })

  it('should handle empty strings', () => {
    expect(generatePascalCase('')).toBe('')
  })

  it('should handle strings without underscores', () => {
    expect(generatePascalCase('hello')).toBe('Hello')
  })

  it('should handle multiple underscores', () => {
    // Function filters out empty strings from double underscores
    expect(generatePascalCase('hello__world')).toBe('Hello World')
  })

  it('should capitalize first letter of each word', () => {
    expect(generatePascalCase('transaction_type')).toBe('Transaction Type')
    expect(generatePascalCase('status_code')).toBe('Status Code')
  })
})

describe('sentenceCase', () => {
  it('should capitalize first letter and lowercase rest', () => {
    expect(sentenceCase('HELLO')).toBe('Hello')
    expect(sentenceCase('world')).toBe('World')
    expect(sentenceCase('hELLO')).toBe('Hello')
  })

  it('should handle already sentence-cased strings', () => {
    expect(sentenceCase('Hello')).toBe('Hello')
    expect(sentenceCase('World')).toBe('World')
  })

  it('should handle empty strings', () => {
    expect(sentenceCase('')).toBe('')
  })

  it('should handle single character strings', () => {
    expect(sentenceCase('a')).toBe('A')
    expect(sentenceCase('A')).toBe('A')
  })

  it('should handle strings with spaces', () => {
    expect(sentenceCase('HELLO WORLD')).toBe('Hello world')
    expect(sentenceCase('hello world')).toBe('Hello world')
  })

  it('should handle mixed case properly', () => {
    expect(sentenceCase('hElLo WoRlD')).toBe('Hello world')
    expect(sentenceCase('TEST')).toBe('Test')
  })
})
