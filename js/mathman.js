// Global Variables
var digits = [];
var blanks;
var falseguess = 1;

function generateEq () {  				  				// Function to generate the Summation problem problem
	var n = 3;  				// number of terms in Summation + 1 sum 
	var d = 2;					// digits allowed
	var numbers = [];
	numbers[n-1] = 0
	for(i=0; i<n-1; i++){
		numbers[i] = Math.floor(Math.random()*100);
		numbers[n-1] += numbers[i];
	}

	for(i=0; i<n; i++){									// Extraction of digits
		digits[i] = [];
		temp = numbers[i];
		for(j=Math.max(d-1,numbers[i].toString().length-1);j>-1;j--){
			digits[i][j] = temp%10;
			temp = parseInt(temp/10);
		}
	}

	var equation_template = '';							// Generating the Equation Template
	for(j=0;j<n;j++){
		for(i=0; i<digits[j].length; i++){
			equation_template += '<span id="eq-'+j+'-'+i+'">_ </span>';
		}
		if(j<n-2)
			equation_template += '+';
		else if(j==n-2)
			equation_template += '=';
	}
	
	
	
	blanks = 0;
	for(i=0;i<n;i++){
		blanks += digits[i].length;
	}

	$('#equation').html(equation_template);  			// Output Equation
}

function updateImage(){
	$('#mathmanimg').html('<img src="images/'+falseguess+'.png" class="img-thumbnail" style="border:none">');
}

function startGame(){									// Start or Restart Game
	falseguess = 1;	
	digits = [];
	generateEq();
	updateImage();
}

function gameOver(result){								// Finish Game Function
	$('.checkmm').attr('disabled','disabled');
	if(result)
		$('#notif_body').html('<img src="images/alive.png" class="img-tumbnail pull-left"><div class="pull-left"><h2>You Won!!</h2><button class="btn btn-primary btn-sm play">Play agarin</button></div>');
	else
		$('#notif_body').html('<img src="images/dead.png" class="img-tumbnail pull-left"><div class="pull-left"><h2 class="text-danger">Game Over!!</h2><button class="btn btn-primary btn-sm play">Play agarin</button></div>');
	//$('.overlay').delay(1000).slideDown('slow');
	$('#notif_body').slideDown('fast');
	$('.play').click(function(){ 						// redirect to play again
		startGame();
		$('.checkmm').removeAttr('disabled').removeClass('btn-success').removeClass('btn-danger');		
		//$('.overlay').slideUp('slow');
		$('#notif_body').slideUp('slow');
	});
}

function guess(key){									// Guessing function
	var flag = false;
	for(i=0;i<digits.length;i++){
		for(j=0;j<digits[i].length;j++){
			if(digits[i][j]==parseInt(key)){
				$('#eq-'+i+'-'+j).html(key);
				blanks--;
				$('#'+key).addClass('btn-success').attr('disabled','disabled');
				flag = true;
			}
		}
	}
	if(!flag){
		$('#'+key).addClass('btn-danger').attr('disabled','disabled');
		falseguess++;
		updateImage();
	}
	if(falseguess==7){
		gameOver(false);
	}
	else if(blanks==0){
		gameOver(true)
	}
}

$(document).ready(function(){							// Main Onload function
	$('.play').click(function(){
		startGame();
		$('.checkmm').click(function(event){
			guess(event.target.id);
		});
		$('.overlay').slideUp('slow');
	});
});