const list = document.querySelector(".list-group");

list.addEventListener("click", async (event) => {
  const target = event.target;
  const id = parseInt(target.parentElement.dataset.id);

  if (target.classList.contains("toggle-btn")) {
    try {
      const response = await axios.post("/toggle-task", { id });

      if (response.data) {
        const badge = target.parentElement.querySelector(".badge");
        const isCompleted = badge.classList.contains("bg-success");

        if (isCompleted) {
          badge.classList.remove("bg-success");
          badge.classList.add("bg-secondary");
          badge.innerText = "In progress";

          target.classList.remove("btn-secondary");
          target.classList.add("btn-success");
        } else {
          badge.classList.remove("bg-secondary");
          badge.classList.add("bg-success");
          badge.innerText = "Completed";

          target.classList.remove("btn-success");
          target.classList.add("btn-secondary");
        }
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
          target.parentElement.querySelector("label").innerText = answer;
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
  } else if (target.classList.contains("delete-btn")) {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await axios.post("/delete-task", { id });

        if (response.data) {
          target.parentElement.remove();
        } else {
          alert(response.data);
        }
      } catch (error) {
        alert(e.response.data);
      }
    }
  }
});
