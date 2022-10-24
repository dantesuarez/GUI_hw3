/*
    Name: Dante Suarez
    Date: 10/24/2022
    Class: GUI Programming 1
    Assignment: HW3 - Creating an Interactive Dynamic Table
    Document: generator.js
*/

// Getter functions for each box of input
function get_low_col(){
    var low_col = document.getElementById("low_col").value;
    return low_col;
}

function get_high_col(){
    var high_col = document.getElementById("high_col").value;
    return high_col;
}

function get_low_row(){
    var low_row = document.getElementById("low_row").value;
    return low_row;
}

function get_high_row(){
    var high_row = document.getElementById("high_row").value;
    return high_row;
}

//Function verifies the input to make sure the user entered valid input
function check_input(){

    var is_valid = true;
    var low_col = get_low_col();
    var high_col = get_high_col();
    var low_row = get_low_row();
    var high_row = get_high_row();

    //Calls a function I made for each input that verifies the input
    is_valid = check_low_col(is_valid, low_col);

    is_valid = check_high_col(is_valid, high_col);

    is_valid = check_low_row(is_valid, low_row);

    is_valid = check_high_row(is_valid, high_row);

    //Two if statements that call correct_order functions that check
    //that the columns and rows are entered properly.
    if(!col_correct_order()){
        var error_message = document.createElement("p");
        error_message.innerHTML = "Error - Low column value is greater than or equal to High column value";
        document.getElementById("message").className = "";
        document.getElementById("message").appendChild(error_message);
        is_valid = false;
    } 
 

    if(!row_correct_order()){
        var error_message = document.createElement("p");
        error_message.innerHTML = "Error - Low row value is greater than or equal to High row value";
        document.getElementById("message").className = "";
        document.getElementById("message").appendChild(error_message);
        is_valid = false;
    }

    // if the input is not valid we need to get the error message element
    if(!is_valid){
        document.getElementById("message").className = "";
    }

    return is_valid;
}


//Funtion that creates the table and writes it to the screen
function generate_table(){
    
    //verify input
    if( !check_input() ){ 
        return; 
    } 

    document.getElementById("low_col").className = "";
    document.getElementById("high_col").className = "";
    document.getElementById("low_row").className = "";
    document.getElementById("high_row").className = "";
    document.getElementById("multiplication_table").innerHTML = "";
    document.getElementById("message").innerHTML = "";


    var low_col = get_low_col();
    var high_col = get_high_col();
    var low_row = get_low_row();
    var high_row = get_high_row();
  
    //variables to check how many columns and rows we need
    var column_length = high_col - low_col;
    var row_length = high_row - low_row;


    //create table
    var table = document.createElement("table");
 
    //adds corner cell
    var corner_cell = document.createElement('th');
    corner_cell.innerHTML = 'x';

    var table_header = document.createElement('tr');
    table_header.appendChild(corner_cell);
  
    //For loop that creates all of the initial columns 
    for(var col = low_col, i = 0; i <= column_length; col++, i++){ 
        var tempth = document.createElement("th");
        tempth.innerHTML = col;
        table_header.appendChild(tempth);
    }

    table.appendChild(table_header);

    //For loop creates all of the necessary rows
    for(var i = 0, row = low_row; i <= row_length; i++, row++){

        var tr = document.createElement('tr');


        var tempth = document.createElement("th");
        tempth.innerHTML = row;


        tr.appendChild(tempth);


        //For loop calculates each cell and adds it to the multiplication table
        for(var col = low_col, j = 0; j <= column_length; j++, col++){

            var temptd = document.createElement('td');
            temptd.innerHTML = col * row;

            tr.appendChild(temptd);
        }

        table.appendChild(tr);

    }
    document.getElementById("multiplication_table").appendChild(table);

}

//Function to check if the input was decimal (decimal is invalid)
function is_decimal(num){
    if(num % 1 != 0){
        return true;
    }else { 
        return false;
    }
}

//Function to check that the low column is in fact lower than the high column
function col_correct_order(){

    var bool;
    var low_col = parseInt(get_low_col());
    var high_col = parseInt(get_high_col());

    if(low_col <= high_col){
        bool = true;
    }else { 
        bool = false;
    }
    
    return bool;
}

//Function to check that the low row is in fact lower than the high row
function row_correct_order(){

    var bool;
    var low_row = parseInt(get_low_row());
    var high_row = parseInt(get_high_row());

    if(low_row <= high_row){
        bool = true;
    }else {
        bool = false; 
    }

    return bool;
}


//Actual verification functions for each box of input
function check_low_col(validity, column_value) {

    var error_message = document.createElement("p");
    error_message.className = "errorMessage";

    //Check that the input is in the valid range
    if( (column_value < -50) || (column_value > 50) ){

        error_message.innerHTML = "Low column: number not in specified range";
        validity = false;

       //checks that the value entered is a number and not empty 
    } else if(isNaN(column_value) || column_value == ""){

        error_message.innerHTML = "Low column: enter a valid number";
        validity = false; 

        //checks to make sure the value is not a decimal
    } else if(is_decimal(column_value)){

        error_message.innerHTML = "Low column: please enter a whole number";
        validity = false; 

    }

    
    document.getElementById("message").appendChild(error_message);

    //Function will return false validity if any of these if statements execute
    return validity;

}

function check_high_col(validity, column_value) {

    var error_message = document.createElement("p");
    error_message.className = "errorMessage";

    if( (column_value < -50) || (column_value > 50) ){

        error_message.innerHTML = "High column: number not in specified range";
        validity = false;

    } else if(isNaN(column_value) || column_value == "" ){

        error_message.innerHTML = "High Column: enter a valid number";
        validity = false;

    }else if(is_decimal(column_value)){

        error_message.innerHTML = "High Column: please enter a whole number";
        validity = false;

    }

    document.getElementById("message").appendChild(error_message);

    return validity;

}

function check_low_row(validity, row_value) {

    var error_message = document.createElement("p");
    error_message.className = "errorMessage";

    if( (row_value < -50) || (row_value > 50) ){

        error_message.innerHTML = "Low row: number not in specified range";
        validity = false;

    } else if(isNaN(row_value) || row_value == ""){

        error_message.innerHTML += "Low row: enter a valid number"; 
        validity = false;

    } else if( is_decimal(row_value)){

        error_message.innerHTML += "Low row: please enter a whole number"; 
        validity = false;
    }
    document.getElementById("message").appendChild(error_message);

    return validity;

}

function check_high_row(validity, row_value) {

    
    var error_message = document.createElement("p");
    error_message.className = "errorMessage"

    if( (row_value < -50) || (row_value > 50) ){

        error_message.innerHTML = "High row: number not in specified range";
        validity = false;

    } else if(isNaN(row_value) || row_value == ""){

        error_message.innerHTML = "High row: enter a valid number";
        validity = false; 

    }else if(is_decimal(row_value)){

        error_message.innerHTML = "High row: please enter a whole number";
        validity = false;
    }

    document.getElementById("message").appendChild(error_message);

    return validity;

}