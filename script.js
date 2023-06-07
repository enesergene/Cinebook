const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movies');
const seats =  document.querySelectorAll('.seat:not(.reserved)');

getfromLocalStorage();
calculate();

container.addEventListener('click',function(e){

    if(e.target.classList.contains('seat') && !e.target.classList.contains('seat reserved')){
        e.target.classList.toggle('selected');
        calculate();
    }

});

select.addEventListener('change',function(e){

    calculate();
});

function calculate(){
    const selectedSeat = container.querySelectorAll('.seat.selected');
    const selectedSeatArr = [];
    const seatsArr = [];

    selectedSeat.forEach(function(seat){
        selectedSeatArr.push(seat);
    });
    seats.forEach(function(seat){
        seatsArr.push(seat);
    });

    let selectedSeatsIndex = selectedSeatArr.map(function(seat){
        return seatsArr.indexOf(seat);
    });
    console.log(selectedSeatsIndex);

    let selectedSeatCount = selectedSeat.length;
    let price = select.value;
    count.innerText = selectedSeatCount;
    amount.innerText = price*selectedSeatCount;

    saveToLocalStorage(selectedSeatsIndex);
}
function getfromLocalStorage (){
    const selectedMovies = JSON.parse(localStorage.getItem('selectedMovies'));
    const selectedSeats = localStorage.getItem('selectedSeats');

    if(selectedMovies != null){
        select.selectedIndex = selectedMovies;
    }
    if(selectedSeats != null && selectedSeats.length>0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        });
    }
}
function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats',JSON.stringify(indexs));
    localStorage.setItem('selectedMovies',select.selectedIndex);
};