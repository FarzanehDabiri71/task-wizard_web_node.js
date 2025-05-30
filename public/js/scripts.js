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
  }
});
