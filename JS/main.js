var SiteName = document.getElementById("SiteName")
var SiteURL = document.getElementById("SiteURL");
var siteNameDiv = document.getElementById("siteNameDiv");
var siteUrlDiv = document.getElementById("siteUrlDiv");
var Submit = document.getElementById("Submit");
var tbody = document.getElementById("tbody");
var Delete = document.getElementById("Delete");
var errorMsg = document.getElementById("errorMsg");
var errorShadow = document.getElementById("errorShadow");
var bookList = []
var urlsRe =/^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

if(localStorage.getItem("books") != null) {
   bookList = JSON.parse(localStorage.getItem("books"))
}

SiteName.oninput = function () {
   if(SiteName.value.length < 3) {
   siteNameDiv.classList.add("invalid")
   } else {
      siteNameDiv.classList.remove("invalid");
      siteNameDiv.classList.add("valid");
   }
}

SiteURL.oninput = function () {
   if (urlsRe.test(SiteURL.value)) {
      siteUrlDiv.classList.remove("invalid");
      siteUrlDiv.classList.add("valid");
   } else {
      siteUrlDiv.classList.remove("valid");
      siteUrlDiv.classList.add("invalid");
   }
};

Submit.onclick = function () {
if (SiteName.value.length >= 3 && urlsRe.test(SiteURL.value)) {
   addBook();
} else {
   errorMsg.classList.remove("d-none");
   errorShadow.classList.remove("d-none");
}
};

Display()
function addBook() {
   var Book = {
      Name: SiteName.value , 
      URL : SiteURL.value
   }
   bookList.push(Book)
   localStorage.setItem("books" , JSON.stringify(bookList))
   Display()
   clear()
}

function Display() {
   var booksHtml = ""
   for(var i = 0 ; i < bookList.length ; i++) {
      booksHtml += `<tr>
            <td>${i+1}</td>
            <td>${bookList[i].Name}</td>
            <td>
               <a href="${bookList[i].URL}" target="_blank" class="btn btn-warning my-a">
               <i class="fa-solid fa-eye"></i>
               Visit
                  
            </a>
            </td>
            <td>
            <button class="btn btn-danger" id="Delete" onclick=deleteItem(${i})>
               <i class="fa-solid fa-trash"></i>
               Delete
            </button>
            </td>
            </tr>
      `;
   }
   tbody.innerHTML = booksHtml
}
function deleteItem(index) {
   bookList.splice(index , 1)
   localStorage.setItem("books", JSON.stringify(bookList));
   Display()
}
function clear() {
   SiteName.value = ""
   SiteURL.value = ""
}
function closeMsg() {
      errorMsg.classList.add("d-none");
      errorShadow.classList.add("d-none");

}