function deleteNode(node) {
    const toDelete = document.getElementById(node);
    while (toDelete.firstChild) {
        toDelete.removeChild(toDelete.firstChild);
    }
    toDelete.parentElement.removeChild(toDelete);
}

window.addEventListener("load", () => {
    const form = document.getElementById("new-task-form");
    const input = document.getElementById("new-task-input");
    const list = document.getElementById("tasks");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const text = input.value;

        if (!text) {
            alert("Please fill out the task");
            return;
        }

        input.value = "";

        const key = `${input.value}${Math.random() * 10}}`;

        const task_el = document.createElement("div");
        task_el.classList.add("task");
        task_el.setAttribute("id", key);

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
        task_edit_el.setAttribute("id", "edit");
        task_edit_el.classList.add("button");
        task_edit_el.innerText = "Edit";

        // Tik button
        const task_tik_el = document.createElement("button");
        task_tik_el.setAttribute("id", "done");
        task_tik_el.classList.add("button");
        task_tik_el.innerText = "✔";
        task_tik_el.addEventListener("click", () => {
            task_tik_el.parentElement.parentElement.style.backgroundColor = "green";

            var local = new Date();
            task_tik_el.parentElement.parentElement.firstChild.innerText += ` ➜ FINISHED: ${local.getDay()}/${local.getMonth()}/${local.getFullYear()}`;
        });

        // Delete button
        const task_delete_el = document.createElement("button");
        task_delete_el.setAttribute("id", "delete");
        task_delete_el.classList.add("button");
        task_delete_el.innerText = "X";
        task_delete_el.addEventListener("click", () => deleteNode(key));

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_tik_el);
        task_actions_el.appendChild(task_delete_el);
        task_el.appendChild(task_actions_el);
        task_edit_el.addEventListener("click", () => {
            task_tik_el.parentElement.parentElement.style.backgroundColor = "yellow";
        });
    });
});