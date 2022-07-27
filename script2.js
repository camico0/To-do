window.addEventListener("load", () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list = document.querySelector("#tasks");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const text = input.value;

        if (!text) {
            alert("Please fill out the task");
            return;
        }

        input.value = "";

        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");
        task_content_el.innerText = text;

        task_el.appendChild(task_content_el);
        list.appendChild(task_el);

        // Acctions

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        // Edit button
        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("button");
        task_edit_el.innerText = "Edit";

        task_actions_el.appendChild(task_edit_el);
    });
});