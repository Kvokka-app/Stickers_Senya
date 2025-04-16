
function generatePrompt() {
  const character = document.getElementById('character').value;
  const pose = document.getElementById('pose').value;
  const styleSelect = document.getElementById('style').value;
  const customStyle = document.getElementById('customStyle').value;

  const style = styleSelect.includes("Свой") ? customStyle : styleSelect;

  const prompt = `Создай стикер с ${character}, в ${style} стиле. Персонаж изображён ${pose}. Он должен быть нарисован в цифровом акварельном стиле: мягкие текстуры, приглушённые цвета, округлая форма тела, крупные выразительные глаза с бликами, пушистый контур меха, лёгкий румянец на щеках, тёмно-коричневые контуры без резких границ.\n\nОбязательно добавь:\n— Белую равномерную обводку\n— Мягкую серую тень под персонажем\n— Прозрачный фон (PNG)\n— Формат 1:1, размер 512×512 px`;

  document.getElementById('result').value = prompt;

  if (window.Telegram && window.Telegram.WebApp) {
    Telegram.WebApp.MainButton.setText("Скопировать промт");
    Telegram.WebApp.MainButton.show();
    Telegram.WebApp.MainButton.onClick(() => {
      Telegram.WebApp.sendData(prompt);
    });
  }
}
