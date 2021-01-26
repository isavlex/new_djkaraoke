// showHide({
//     clickEl: ".class",
//     clckToggleEl: ".class",
//     clickToggleClass: "class",
//     showHideEl: ".class",
//     showHideToggleClass: "class"
//     clickBreakEl: ".class"
// });

function showHide(arg) {
  let clickElement = document.querySelectorAll(arg.clickEl)
  let clickBreakEl = document.querySelectorAll(arg.clickBreakEl)
  clickElement.forEach((element) => {
    let clickToggle = element.querySelector(arg.clckToggleEl)
    let showHideEl = element.parentElement.querySelector(arg.showHideEl)

    element.addEventListener("click", () => {
      if (clickToggle) {
        clickToggle.classList.toggle(arg.clickToggleClass)
      } else {
        element.classList.toggle(arg.clickToggleClass)
      }

      showHideEl.classList.toggle(arg.showHideToggleClass)
    })
  })
  if (clickBreakEl) {
    clickBreakEl.forEach((element) => {
      element.addEventListener("click", () => {
        let closeEvent = new Event("click")
        let clickElement = document.querySelector(arg.clickEl)
        clickElement.dispatchEvent(closeEvent)
      })
    })
  }
}

export default showHide
