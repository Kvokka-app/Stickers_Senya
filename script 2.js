
function generatePrompt() {
  const character = document.getElementById('character').value.trim();
  const pose = document.getElementById('pose').value.trim();
  const styleSelect = document.getElementById('style');
  const selectedStyle = styleSelect.value;
  const customStyle = document.getElementById('customStyle').value.trim();
  const errorBlock = document.getElementById('error-message');

  errorBlock.textContent = "";

  if (!character || !pose || (selectedStyle === "Свой вариант" && !customStyle)) {
    errorBlock.textContent = "Сеня не умеет читать мысли, придётся заполнить поля.";
    return;
  }

  let style = "";
  if (selectedStyle === "Свой вариант") {
    style = customStyle;
  } else if (selectedStyle === "Акварельные стикеры") {
    style = "акварельный милый стиль";
  } else if (selectedStyle === "Детальный мультяшный") {
    style = "векторный подробный стиль";
  }

  const prompt = `Создай стикер с ${character}, в ${style} стиле. Персонаж изображён ${pose}. Он должен быть нарисован в цифровом акварельном стиле: мягкие текстуры, приглушённые цвета, округлая форма тела, крупные выразительные глаза с бликами, пушистый контур меха, лёгкий румянец на щеках, тёмно-коричневые контуры без резких границ.\n\nОбязательно добавь:\n— Белую равномерную обводку\n— Мягкую серую тень под персонажем\n— Прозрачный фон (PNG)\n— Формат 1:1, размер 512×512 px`;

  const resultField = document.getElementById('result');
  resultField.value = prompt;

  if (window.Telegram && window.Telegram.WebApp) {
    Telegram.WebApp.MainButton.setText("Скопировать промт");
    Telegram.WebApp.MainButton.show();
    Telegram.WebApp.MainButton.onClick(() => {
      resultField.select();
      document.execCommand("copy");
      Telegram.WebApp.showPopup({
        message: "Промт скопирован!",
        buttons: [{ id: "ok", type: "ok", text: "Ок" }]
      });
    });
  }
}

document.getElementById('style').addEventListener('change', (e) => {
  const customStyleInput = document.getElementById('customStyle');
  if (e.target.value === "Свой вариант") {
    customStyleInput.disabled = false;
    customStyleInput.placeholder = "Введи свой стиль...";
  } else {
    customStyleInput.disabled = true;
    customStyleInput.value = "";
    customStyleInput.placeholder = "";
  }
});

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('character').focus();

  if (window.Telegram && Telegram.WebApp.themeParams) {
    const theme = Telegram.WebApp.themeParams;
    document.body.style.backgroundColor = theme.bg_color || "#fff7f0";
    document.body.style.color = theme.text_color || "#333";
    const inputs = document.querySelectorAll("input, select, textarea");
    inputs.forEach(el => {
      el.style.backgroundColor = theme.secondary_bg_color || "#ffffff";
      el.style.color = theme.text_color || "#000000";
      el.style.borderColor = theme.hint_color || "#cccccc";
    });
    const btn = document.querySelector("button");
    btn.style.backgroundColor = theme.button_color || "#ffb347";
    btn.style.color = theme.button_text_color || "#222";
  }
});
