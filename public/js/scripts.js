const list = document.querySelector(".list-group");

list.addEventListener("click", async (event) => {
  const target = event.target;
  const id = parseInt(target.parentElement.dataset.id);

  if (target.classList.contains("toggle-btn")) {
    try {
      const response = await axios.post("/toggle-task", { id });

      if (response.data) {
        location.reload();
      } else {
        alert(response.data);
      }
    } catch (error) {
      alert(e.response.data);
    }
  } else if (target.classList.contains("edit-btn")) {
    const text = target.parentElement.querySelector("label").innerText;
    const answer = prompt("Please enter new title: ", text);
    if (answer && answer.length > 3) {
      try {
        const response = await axios.post("/edit-task", { id, title: answer });
        if (response.data === true) {
          location.reload();
        } else {
          alert(response.data);
        }
      } catch (error) {
        alert(error.response.data);
      }
    } else if (answer) {
      // cancel رو شامل نمیشه
      alert("Please enter at least 3 characters.");
    }
  }
});
