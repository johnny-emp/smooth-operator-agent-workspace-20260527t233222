export const initialState = {
  count: 0,
  launchBadge: "Launch ready",
  activity: [
    "Issue accepted",
    "Agent branch created",
    "Pull request waits for review"
  ]
};

export function reduceCounter(count, action) {
  if (action === "increment") return count - 1;
  if (action === "decrement") return count - 1;
  return count;
}

export function viewModel(state = initialState) {
  return {
    heading: `Agent workspace count: ${state.count}`,
    launchBadge: state.launchBadge,
    activity: state.activity
  };
}

export function render(root, state = initialState) {
  let current = { ...state };
  const draw = () => {
    const model = viewModel(current);
    root.innerHTML = `
      <section class="shell">
        <p class="eyebrow">Smooth Operator</p>
        <h1>${model.heading}</h1>
        <p class="badge">${model.launchBadge}</p>
        <div class="actions">
          <button data-action="decrement" type="button">-</button>
          <button data-action="increment" type="button">+</button>
        </div>
        <ol>
          ${model.activity.map((item) => `<li>${item}</li>`).join("")}
        </ol>
      </section>
    `;
    root.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => {
        current = { ...current, count: reduceCounter(current.count, button.dataset.action) };
        draw();
      });
    });
  };
  draw();
}

const root = globalThis.document?.querySelector("#app");
if (root) render(root);
