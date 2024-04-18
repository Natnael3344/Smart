import React from 'react'
import moment from 'moment';

export  const required = value => (value ? undefined : 'This field is required.')
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
export const minValue18 = minValue(18)
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
export const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
export const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined
export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined
export const adultAge = age =>{
    let dob = moment(age);
    diff = moment.duration(moment().diff(dob)).asYears();
    response = (diff > 0 && diff >= 18) ? undefined : 'The minimum age requirement is 18 years';
    return response;
}    


export const fileComplaintValidation = {
  // Already filled
  full_name: {
    valid: '',
    isEmpty: 'Default',
    inValid: 'Can only contain characters!',
    isValid: true,
    validation: /^[a-zA-Z ,.'-]+$/,
  },
  // Already filled
  phone_number: {
    valid: '',
    inValid: 'Enter correct Phone Number!',
    isValid: true,
    validation: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    isEmpty:'Phone number is required'
  },
  age: {
    valid: '',
    inValid: 'Enter Valid age!',
    isValid: undefined,
    validation: /^\d{0,2}$/,
    isEmpty:'Age is required'
  },
  occupation: {
    valid: '',
    inValid: 'Cannot be Empty!',
    isValid: undefined,
    validation: /^$|^[a-zA-Z ,.'-]+$/,
    isEmpty:'Occupation is required'
  },
  pincode: {
    valid: '',
    inValid: 'Required Field!',
    isValid: undefined,
    validation: /^.+$/,
    isEmpty:'Pincode is required'
  },
  state: {
    valid: '',
    inValid: 'Required Field!',
    isValid: undefined,
    validation: /^.+$/,
  },
  district: {
    valid: '',
    inValid: 'Required Field!',
    isValid: undefined,
    validation: /^.+$/,
  },
  description_of_camplaint: {
    valid: '',
    inValid: 'Cannot be Empty!',
    isValid: undefined,
    validation: /^$|^.+$/,
    errorMessage: "Please enter a valid name",
    isEmpty:'Description of complaint is required'
  },
  audio_file_camplaint: {
    isValid: undefined,
  },
  respondent_full_name: {
    valid: '',
    inValid: 'Can only contain characters!',
    isValid: undefined,
    validation: /^$|^[a-zA-Z ,.'-]+$/,
    isEmpty:'Respondent full name is required'
  },
  respondent_mobile: {
    valid: '',
    inValid: 'Enter correct Phone Number!',
    isValid: undefined,
    validation: /^[0-9]{10}$/,
    isEmpty:'Respondent mobile is required'
  },
  respondent_address: {
    valid: '',
    inValid: 'Cannot be Empty',
    isValid: undefined,
    validation: /^$|^.+$/,
    isEmpty:'Respondent address is required'
  },
  respondent_relation: {
    valid: '',
    inValid: 'Cannot be Empty',
    isValid: undefined,
    validation: /^$|^.+$/,
    isEmpty:'Respondent relation is required'
  },
  evidence_type: {
    valid: '',
    inValid: 'Required Field!',
    isValid: undefined,
    validation: /^$|^.+$/,
  },
  evidence_description: {
    valid: '',
    inValid: 'Required Field!',
    isValid: undefined,
    validation: /^$|^.+$/,
  },
  evidence_attachment: {
    valid: '',
    inValid: 'Required Field!',
    isValid: undefined,
    validation: /^$|^.+$/,
  },
  witness_name: {
    valid: '',
    inValid: 'Can only contain characters!',
    isValid: undefined,
    validation: /^$|^[a-zA-Z ,.'-]+$/,
  },
  witness_contact_number: {
    valid: '',
    inValid: 'Enter correct Phone Number!',
    isValid: undefined,
    validation: /^$|^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
  },
};