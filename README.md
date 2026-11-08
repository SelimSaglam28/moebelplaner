# mycasa3 Möbelplaner

Leeren Raum einrichten – in 3D und als Grundriss, mit echten Maßen. Läuft direkt im Browser, auch am Handy.

**Öffnen:** https://selimsaglam28.github.io/moebelplaner/

## Was er kann

- Raum: Breite, Länge, Höhe; Tür mit Schwenkbereich und Fenster an jeder Wand
- 3D-Ansicht und Grundriss mit Maßketten, nebeneinander oder umschaltbar
- Katalog: Sofas, Sessel, Ecksofa, Tische, Stühle, Betten, Schränke, Regale, Teppiche, Pflanzen, Lampen
- Möbel ziehen, drehen, Maße eintippen, Farbe wählen, Tische ausziehen
- Hinweise: Abstand zu jeder Wand, Überschneidungen, Türbereich, Durchgänge unter 60 cm
- Rumlaufen wie im Videospiel (Maus/WASD, am Handy Stick) und dich auf Sofas, Stühle und Betten setzen
- Eigene Fotomöbel (3D aus Fotos) mit Showroom – nur mit Passwort
- Die Einrichtung bleibt im eigenen Browser gespeichert; es werden keine Daten verschickt

## Hinweise

- `index.html` (Passwort-Abfrage) lädt `app.js` (den Planer), three.js 0.165 von unpkg, keine Installation
- Die Fotomöbel liegen nur verschlüsselt in `fotomoebel/` (AES-256-GCM, Schlüssel per PBKDF2 aus dem Passwort, entschlüsselt im Browser). Ohne Passwort sind die Dateien unlesbar; „Ohne Fotomöbel weiter“ öffnet den Planer mit den Standardmöbeln
- Holz- und Stoffoberflächen sind nachgebildet. Die Maße unter „Deine Auswahl“ stammen aus Herstellerangaben (Segmüller) und sind ohne Gewähr – vor dem Kauf nachmessen
