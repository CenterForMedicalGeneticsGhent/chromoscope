#!/usr/bin/env bats

@test "encode and decode JSON with three key-value pairs" {
    # Define the initial JSON with three keys and values
    initial_json='{"key1":"value1","key2":"value2","key3":"value3"}'
    
    # Step 1: Encode the JSON into an encoded string
    encoded_string=$(urlsafe-codec-cli encode "$initial_json")

    # Step 2: Decode the encoded string and check if it is equal to the initial JSON
    decoded_json=$(urlsafe-codec-cli decode $encoded_string)
    [ $decoded_json == $initial_json ]

    # Step 3: Encode the decoded JSON and check if it is equal to the previous encoded string
    re_encoded_string=$(urlsafe-codec-cli encode $decoded_json)
    [ $re_encoded_string == $encoded_string ]
}
