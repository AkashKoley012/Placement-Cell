let navLink = document.getElementsByClassName("nav-link");

navLink[0].addEventListener("click", () => {
    console.log("Students");
    navLink[0].classList.remove("active");
    navLink[1].classList.add("active");
});

navLink[1].addEventListener("click", () => {
    console.log("Interviews");
    navLink[1].classList.remove("active");
    navLink[0].classList.add("active");
});
