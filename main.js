let coursename = document.getElementById("courseName");
let coursecategory = document.getElementById("courseCategory");
let courseprice = document.getElementById("coursePrice");
let coursedescription = document.getElementById("courseDescription");
let addBtn = document.getElementById("addBtn");
let tablebody = document.getElementById("tableBody");
let deletebtn = document.getElementById("deleteBtn")
let search = document.getElementById("search");
let courses ;
if(JSON.parse(localStorage.getItem('courses')) == null){
  courses = [];

}else {
  courses = JSON.parse(localStorage.getItem('courses'));
}
let currentindex = '';
display();
// add course
addBtn.onclick = (event) => {
  if (addBtn.innerHTML == "Add Course"){
    let course = {
      name: coursename.value,
      category: coursecategory.value,
      price: courseprice.value,
      description: coursedescription.value,
    };
    
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
    clearInputs();
    display();
    coursename.classList.remove('is-valid');
    coursecategory.classList.remove('is-valid');
    courseprice.classList.remove('is-valid');
    addBtn.setAttribute('disabled', 'disabled');
    

    event.preventDefault();
    Swal.fire(
      'Course Added!',
      
      'success'
    )

  }
  if( addBtn.innerHTML == "Update Course"){

    courses[currentindex].name = coursename.value;
    courses[currentindex].category = coursecategory.value;
    courses[currentindex].price = courseprice.value;
    courses[currentindex].description = coursedescription.value;
    addBtn.innerHTML = "Add Course";
    localStorage.setItem('courses', JSON.stringify(courses));
    addBtn.setAttribute('disabled', 'disabled');
    display();
    clearInputs();
    Swal.fire(
      'Course Updated!',
      
      'success'
    )
    

  }
  
};

// clear
function clearInputs() {
  coursename.value = "";
  coursecategory.value = "";
  courseprice.value = "";
  coursedescription.value = "";
}
//display courses
function display() {
  let data = "";
  for (var i = 0; i < courses.length; i++) {
    data +=`<tr> 
    <td> ${i+1} </td>
    <td> ${courses[i].name} </td>
    <td> ${courses[i].category} </td>
    <td> ${courses[i].price} </td>
    <td> ${courses[i].description} </td>
    <td> <a href="#" class="btn btn-outline-primary" onclick="editCourse(${i}) ">Edit </a> </td>
    <td> <a href="#" class="btn btn-outline-danger" onclick="deleteCourse( ${i})" >Delete </a> </td>
    </tr>`
      
  }
  tablebody.innerHTML = data;
}

//delete course
function deleteCourse(index){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(index);
      localStorage.setItem('courses', JSON.stringify(courses));
      display();

      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
 
    


}


// Delete all
deletebtn.onclick = () => {
    
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete all!'
    }).then((result) => {
      if (result.isConfirmed) {
        courses = [];
        localStorage.setItem('courses', JSON.stringify(courses));
        tablebody.innerHTML = '';

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
};

// search
search. onkeyup = () => {
    let searchKey = search.value;
    let data = "";
  for (var i = 0; i < courses.length; i++) {
    if(courses[i].name.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) || courses[i].category.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) || courses[i].price.includes(searchKey)){
        data +=`<tr> 
    <td> ${i+1} </td>
    <td> ${courses[i].name} </td>
    <td> ${courses[i].category} </td>
    <td> ${courses[i].price} </td>
    <td> ${courses[i].description} </td>
    <td> <a href="#" class="btn btn-outline-primary">Edit </a> </td>
    <td> <a href="#" class="btn btn-outline-danger" onclick="deleteCourse( ${i})" >Delete </a> </td>
    </tr>`

    }
    
      
  }
  tablebody.innerHTML = data;

}
// edit course 
 function editCourse(i){
  currentindex = i ;
  coursename.value= courses[i].name;
  coursecategory.value = courses[i].category;
  courseprice.value = courses[i].price;
  coursedescription.value = courses[i].description;
  addBtn.innerHTML = "Update Course";
  addBtn.removeAttribute('disabled');
  

 }
 //validation
 //regex
 //coursename
 //first letter capital
 //name 3-10
 //no numbers
 let pattern;
 coursename.onkeyup = function(){
  pattern = /^[A-Z][a-z]{2,10}$/
 if(pattern.test(coursename.value)){
  coursename.classList.remove('is-invalid');
  coursename.classList.add('is-valid');
  addBtn.removeAttribute('disabled');

 } else{
  coursename.classList.remove('is-valid');
  coursename.classList.add('is-invalid');
  addBtn.setAttribute('disabled', 'disabled');
 }
  


 }

 // category valedation
 let patterncategory;
 coursecategory.onkeyup = function(){
  patterncategory = /^[A-Z][a-z]{2,20}$/
 if(pattern.test(coursecategory.value)){
  coursecategory.classList.remove('is-invalid');
  coursecategory.classList.add('is-valid');
  addBtn.removeAttribute('disabled');

 } else{
  coursecategory.classList.remove('is-valid');
  coursecategory.classList.add('is-invalid');
  addBtn.setAttribute('disabled', 'disabled');
 }
  


 }

 // price validation

 
 courseprice.onkeyup = function(){
  pattern = /^[0-9]{1,4}$/
 if(pattern.test(courseprice.value)){
  courseprice.classList.remove('is-invalid');
  courseprice.classList.add('is-valid');
  addBtn.removeAttribute('disabled');

 } else{
  courseprice.classList.remove('is-valid');
  courseprice.classList.add('is-invalid');
  addBtn.setAttribute('disabled', 'disabled');
 }
}



