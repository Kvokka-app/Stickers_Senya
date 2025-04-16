
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

  let styleDescription = "";
  let styleLabel = "";

  if (selectedStyle === "Свой вариант") {
    styleLabel = customStyle;
    styleDescription = customStyle;
  } else if (selectedStyle === "Акварельные стикеры") {
    styleLabel = "акварельный милый стиль";
    styleDescription = "мягкие текстуры, приглушённые цвета, округлая форма тела, крупные выразительные глаза с бликами, пушистый контур меха, лёгкий румянец на щеках, тёмно-коричневые контуры без резких границ";
  } else if (selectedStyle === "Детальный мультяшный") {
    styleLabel = "векторный подробный стиль";
    styleDescription = "чистые линии, детализация текстур, мягкие тени и объём, приглушённые цвета, выразительное лицо, лёгкость и элегантность в подаче";
  }

  const prompt = `Создай стикер с ${character}, в ${styleLabel} стиле. Персонаж изображён ${pose}. Он должен быть нарисован в стиле: ${styleDescription}.

Обязательно добавь:
— Белую равномерную обводку
— Мягкую серую тень под персонажем
— Прозрачный фон (PNG)
— Формат 1:1, размер 512×512 px`;

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
