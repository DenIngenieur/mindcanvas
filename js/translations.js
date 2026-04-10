const translations = {
    en: {
        title: "Freeform Mind Canvas – Paper‑like thinking tool",
        instructions_html: `
            <h1>Freeform Mind Canvas – Manual</h1>
            <p>A digital sketchpad for mind maps and diagrams. Everything stays on your device.</p>
            
            <h2>1. Navigation (Moving & Zooming)</h2>
            <ul>
                <li><strong>PC:</strong> Click and drag the <strong>background</strong> with your left mouse button to move (pan). Use the <strong>scroll wheel</strong> to zoom in and out.</li>
                <li><strong>Mobile/Tablet:</strong> Use <strong>two fingers</strong> to slide the canvas or "pinch" to zoom.</li>
            </ul>

            <h2>2. Drawing & Shapes (The Tools)</h2>
            <ul>
                <li><strong>Select:</strong> Move objects. Click an object to see <strong>orange handles</strong>; drag these to resize. <strong>Double‑click a shape</strong> to add or edit its text: if the shape is empty, you can type new text; if it already has text, you can modify it.</li>
                <li><strong>Pen:</strong> Standard drawing tool for solid lines.</li>
                <li><strong>Marker:</strong> Semi‑transparent highlighter, ideal for emphasizing parts.</li>
                <li><strong>Rect / Ellipse / Circle / Cloud:</strong> Click and drag on the canvas to create these shapes. The 'Circle' stays perfectly round.</li>
                <li><strong>Text:</strong> Places a text block without a visible border.</li>
                <li><strong>Eraser:</strong> Click on any line or shape to remove it instantly.</li>
            </ul>

            <h2>3. Settings (Colors & Sizes)</h2>
            <ul>
                <li><strong>Pen Color:</strong> Sets the color for the Pen tool.</li>
                <li><strong>Marker Color:</strong> Sets the color for the Marker tool.</li>
                <li><strong>Stroke Color:</strong> The border color for new shapes (Rect, Cloud, etc.).</li>
                <li><strong>Fill Color:</strong> The inside color for new shapes.</li>
                <li><strong>Text Color:</strong> The color of the text inside shapes.</li>
                <li><strong>BG Color:</strong> Changes the color of the entire canvas background.</li>
                <li><strong>Brush Size:</strong> Adjusts the thickness of lines and shape borders.</li>
                <li><strong>Font Size:</strong> Choose how large your text should be.</li>
            </ul>

            <h2>4. Management & Sharing</h2>
            <ul>
                <li><strong>Undo (Undo):</strong> Removes the very last object or line you created. (Shortcut: <strong>Ctrl+Z</strong>).</li>
                <li><strong>Clear All:</strong> Completely wipes the canvas. Use with caution!</li>
                <li><strong>Save / Load (Local):</strong> Quickly stores/retrieves your work in the browser's temporary memory.</li>
                <li><strong>Export JSON:</strong> Downloads your work as a <code>.json</code> file. You can send this file to friends or colleagues – they can import it and continue working!</li>
                <li><strong>Import JSON:</strong> Upload a previously saved <code>.json</code> file. Perfect for collaboration: share your mind maps, let others add their ideas, or combine different diagrams.</li>
                <li><strong>Screenshot:</strong> Saves your current view as a <code>.png</code> image.</li>
            </ul>
            <p><strong>📁 Example mind maps (click to download):</strong></p>
            <ul>
                <li><a href="examples/pot_vs_kin_energie.json" download>⚡ pot_vs_kin_energie.json</a> – physics example (potential vs kinetic energy)</li>
                <li><a href="examples/rudy.json" download>🎨 rudy.json</a> – a playful self‑portrait</li>
                <li><a href="examples/versterker.json" download>🔊 versterker.json</a> – amplifier diagram / electronics</li>
                <li><a href="examples/weer.json" download>☁️ weer.json</a> – weather mind map</li>
            </ul>
            <p><em>After downloading, use <strong>Import JSON</strong> to load an example and see what you can create!</em></p>
        `
    },
    nl: {
        title: "Vrijvorm Mind Canvas – Denken als op papier",
        instructions_html: `
            <h1>Vrijvorm Mind Canvas – Handleiding</h1>
            <p>Een digitaal kladblok voor mindmaps en diagrammen. Alles blijft op je eigen apparaat.</p>
            
            <h2>1. Navigatie (Bewegen & Zoomen)</h2>
            <ul>
                <li><strong>PC:</strong> Klik en sleep op de <strong>achtergrond</strong> met de linkermuisknop om het canvas te verschuiven. Gebruik het <strong>scrollwiel</strong> om in en uit te zoomen.</li>
                <li><strong>Mobiel/Tablet:</strong> Gebruik <strong>twee vingers</strong> om te schuiven of te "knijpen" om te zoomen.</li>
            </ul>

            <h2>2. Tekenen & Vormen (De Tools)</h2>
            <ul>
                <li><strong>Select:</strong> Verplaats objecten. Klik op een vorm om <strong>oranje blokjes</strong> te zien; sleep deze om de grootte aan te passen. <strong>Dubbelklik op een vorm</strong> om tekst toe te voegen of te bewerken: als de vorm leeg is, kun je nieuwe tekst typen; als er al tekst staat, kun je die aanpassen.</li>
                <li><strong>Pen:</strong> Standaard tekentool voor ondoorzichtige lijnen.</li>
                <li><strong>Marker:</strong> Semi‑transparante markeerstift, ideaal om zaken te accentueren.</li>
                <li><strong>Rect / Ellipse / Circle / Cloud:</strong> Klik en sleep op het canvas om deze vormen te maken. 'Circle' blijft altijd perfect rond.</li>
                <li><strong>Text:</strong> Plaatst een tekstblok zonder zichtbare rand.</li>
                <li><strong>Eraser:</strong> Klik op een lijn of vorm om deze direct te wissen.</li>
            </ul>

            <h2>3. Instellingen (Kleuren & Maten)</h2>
            <ul>
                <li><strong>Pen Color:</strong> De kleur voor de Pen-tool.</li>
                <li><strong>Marker Color:</strong> De kleur voor de Marker-tool.</li>
                <li><strong>Stroke Color:</strong> De randkleur voor nieuwe vormen (Rechthoek, Wolk, etc.).</li>
                <li><strong>Fill Color:</strong> De vulkleur (binnenkant) van nieuwe vormen.</li>
                <li><strong>Text Color:</strong> De kleur van de tekst in de vormen.</li>
                <li><strong>BG Color:</strong> Verandert de kleur van de volledige achtergrond.</li>
                <li><strong>Brush Size:</strong> Pas de dikte van lijnen en randen aan.</li>
                <li><strong>Font Size:</strong> Kies hoe groot de tekst moet zijn.</li>
            </ul>

            <h2>4. Beheer & Delen</h2>
            <ul>
                <li><strong>Undo (Ongedaan maken):</strong> Verwijdert het laatste object of de laatste lijn die je hebt gemaakt. (Sneltoets: <strong>Ctrl+Z</strong>).</li>
                <li><strong>Clear All:</strong> Wast het hele canvas in één keer leeg. Let op: dit kan niet ongedaan worden gemaakt!</li>
                <li><strong>Save / Load (Lokaal):</strong> Bewaart of laadt je werk snel in het tijdelijke geheugen van de browser.</li>
                <li><strong>Export JSON:</strong> Downloadt je werk als een <code>.json</code> bestand. Je kunt dit bestand naar vrienden of collega's sturen – zij kunnen het importeren en verder werken!</li>
                <li><strong>Import JSON:</strong> Upload een eerder opgeslagen <code>.json</code> bestand. Perfect voor samenwerking: deel je mindmaps, laat anderen hun ideeën toevoegen of combineer verschillende diagrammen.</li>
                <li><strong>Screenshot:</strong> Maakt een foto van je huidige scherm en slaat deze op als <code>.png</code> afbeelding.</li>
            </ul>
            <p><strong>📁 Voorbeeld mindmaps (klik om te downloaden):</strong></p>
            <ul>
                <li><a href="examples/pot_vs_kin_energie.json" download>⚡ pot_vs_kin_energie.json</a> – natuurkunde voorbeeld (potentiële vs kinetische energie)</li>
                <li><a href="examples/rudy.json" download>🎨 rudy.json</a> – een speels zelfportret</li>
                <li><a href="examples/versterker.json" download>🔊 versterker.json</a> – versterker schema / elektronica</li>
                <li><a href="examples/weer.json" download>☁️ weer.json</a> – weer mindmap</li>
            </ul>
            <p><em>Download een voorbeeld en gebruik <strong>Import JSON</strong> om het te laden en te zien wat je ermee kunt maken!</em></p>
        `
    },
    fr: {
        title: "Toile à idées libre – Pensez comme sur papier",
        instructions_html: `
            <h1>Toile à idées libre – Manuel</h1>
            <p>Un bloc-notes numérique pour cartes mentales et schémas. Tout reste sur votre appareil.</p>
            
            <h2>1. Navigation (Déplacer & Zoomer)</h2>
            <ul>
                <li><strong>PC :</strong> Cliquez et faites glisser l'<strong>arrière-plan</strong> avec le bouton gauche de la souris pour déplacer (panoramique). Utilisez la <strong>molette</strong> pour zoomer.</li>
                <li><strong>Mobile/Tablette :</strong> Utilisez <strong>deux doigts</strong> pour faire glisser la toile ou "pincer" pour zoomer.</li>
            </ul>

            <h2>2. Dessin & Formes (Les Outils)</h2>
            <ul>
                <li><strong>Select :</strong> Déplacez les objets. Cliquez sur un objet pour voir les <strong>poignées oranges</strong> ; faites-les glisser pour redimensionner. <strong>Double‑cliquez sur une forme</strong> pour ajouter ou modifier son texte : si la forme est vide, vous pouvez taper un nouveau texte ; si elle contient déjà du texte, vous pouvez le modifier.</li>
                <li><strong>Pen :</strong> Outil de dessin standard pour des lignes pleines.</li>
                <li><strong>Marker :</strong> Surligneur semi‑transparent, idéal pour accentuer des parties.</li>
                <li><strong>Rect / Ellipse / Circle / Cloud :</strong> Cliquez et faites glisser sur la toile pour créer ces formes. 'Circle' reste parfaitement rond.</li>
                <li><strong>Text :</strong> Place un bloc de texte sans bordure visible.</li>
                <li><strong>Eraser :</strong> Cliquez sur une ligne ou une forme pour la supprimer instantanément.</li>
            </ul>

            <h2>3. Paramètres (Couleurs & Tailles)</h2>
            <ul>
                <li><strong>Pen Color :</strong> Définit la couleur de l'outil Pen.</li>
                <li><strong>Marker Color :</strong> Définit la couleur de l'outil Marker.</li>
                <li><strong>Stroke Color :</strong> La couleur de bordure pour les nouvelles formes (Rect, Cloud, etc.).</li>
                <li><strong>Fill Color :</strong> La couleur de remplissage des nouvelles formes.</li>
                <li><strong>Text Color :</strong> La couleur du texte à l'intérieur des formes.</li>
                <li><strong>BG Color :</strong> Modifie la couleur de l'arrière‑plan de toute la toile.</li>
                <li><strong>Brush Size :</strong> Ajuste l'épaisseur des lignes et des bordures.</li>
                <li><strong>Font Size :</strong> Choisissez la taille de votre texte.</li>
            </ul>

            <h2>4. Gestion & Partage</h2>
            <ul>
                <li><strong>Undo (Annuler) :</strong> Supprime le tout dernier objet ou ligne créé. (Raccourci : <strong>Ctrl+Z</strong>).</li>
                <li><strong>Clear All :</strong> Efface complètement la toile. À utiliser avec prudence !</li>
                <li><strong>Save / Load (Local) :</strong> Enregistre ou charge rapidement votre travail dans la mémoire temporaire du navigateur.</li>
                <li><strong>Export JSON :</strong> Télécharge votre travail sous forme de fichier <code>.json</code>. Vous pouvez envoyer ce fichier à des amis ou collègues – ils peuvent l'importer et continuer à travailler !</li>
                <li><strong>Import JSON :</strong> Chargez un fichier <code>.json</code> précédemment enregistré. Parfait pour la collaboration : partagez vos cartes mentales, laissez d'autres ajouter leurs idées ou combinez différents diagrammes.</li>
                <li><strong>Screenshot :</strong> Enregistre votre vue actuelle sous forme d'image <code>.png</code>.</li>
            </ul>
            <p><strong>📁 Exemples de cartes mentales (cliquez pour télécharger) :</strong></p>
            <ul>
                <li><a href="examples/pot_vs_kin_energie.json" download>⚡ pot_vs_kin_energie.json</a> – exemple de physique (énergie potentielle vs cinétique)</li>
                <li><a href="examples/rudy.json" download>🎨 rudy.json</a> – un autoportrait ludique</li>
                <li><a href="examples/versterker.json" download>🔊 versterker.json</a> – schéma d'amplificateur / électronique</li>
                <li><a href="examples/weer.json" download>☁️ weer.json</a> – carte mentale de la météo</li>
            </ul>
            <p><em>Après téléchargement, utilisez <strong>Import JSON</strong> pour charger un exemple et voir ce que vous pouvez créer !</em></p>
        `
    },
    de: {
        title: "Freiform Mind Canvas – Denken wie auf Papier",
        instructions_html: `
            <h1>Freiform Mind Canvas – Handbuch</h1>
            <p>Ein digitales Notizfeld für Mindmaps und Diagramme. Alles bleibt auf Ihrem Gerät.</p>
            
            <h2>1. Navigation (Verschieben & Zoomen)</h2>
            <ul>
                <li><strong>PC:</strong> Klicken und ziehen Sie den <strong>Hintergrund</strong> mit der linken Maustaste, um die Leinwand zu verschieben. Nutzen Sie das <strong>Mausrad</strong> zum Zoomen.</li>
                <li><strong>Mobil/Tablet:</strong> Nutzen Sie <strong>zwei Finger</strong> zum Verschieben oder "Pinchen" zum Zoomen.</li>
            </ul>

            <h2>2. Zeichnen & Formen (Werkzeuge)</h2>
            <ul>
                <li><strong>Select:</strong> Objekte verschieben. Klicken Sie auf ein Objekt, um <strong>orangefarbene Griffe</strong> zu sehen; ziehen Sie daran, um die Größe zu ändern. <strong>Doppelklick auf eine Form</strong> fügt Text hinzu oder bearbeitet vorhandenen Text: ist die Form leer, können Sie neuen Text eingeben; enthält sie bereits Text, können Sie ihn ändern.</li>
                <li><strong>Pen:</strong> Standard‑Zeichenwerkzeug für solide Linien.</li>
                <li><strong>Marker:</strong> Halbtransparenter Textmarker, ideal zum Hervorheben.</li>
                <li><strong>Rect / Ellipse / Circle / Cloud:</strong> Klicken und ziehen Sie auf der Leinwand, um diese Formen zu erstellen. 'Circle' bleibt perfekt rund.</li>
                <li><strong>Text:</strong> Platziert einen Textblock ohne sichtbaren Rahmen.</li>
                <li><strong>Eraser:</strong> Klicken Sie auf eine Linie oder Form, um sie sofort zu löschen.</li>
            </ul>

            <h2>3. Einstellungen (Farben & Größen)</h2>
            <ul>
                <li><strong>Pen Color:</strong> Legt die Farbe für den Stift fest.</li>
                <li><strong>Marker Color:</strong> Legt die Farbe für den Marker fest.</li>
                <li><strong>Stroke Color:</strong> Die Rahmenfarbe für neue Formen (Rechteck, Wolke usw.).</li>
                <li><strong>Fill Color:</strong> Die Füllfarbe für neue Formen.</li>
                <li><strong>Text Color:</strong> Die Farbe des Textes innerhalb der Formen.</li>
                <li><strong>BG Color:</strong> Ändert die Farbe des gesamten Leinwand‑Hintergrunds.</li>
                <li><strong>Brush Size:</strong> Passt die Dicke von Linien und Rahmen an.</li>
                <li><strong>Font Size:</strong> Wählen Sie die gewünschte Schriftgröße.</li>
            </ul>

            <h2>4. Verwaltung & Teilen</h2>
            <ul>
                <li><strong>Undo (Rückgängig):</strong> Löscht das zuletzt erstellte Objekt oder die letzte Linie. (Shortcut: <strong>Strg+Z</strong>).</li>
                <li><strong>Clear All:</strong> Löscht die gesamte Leinwand. Mit Vorsicht genießen!</li>
                <li><strong>Save / Load (Lokal):</strong> Speichert oder lädt Ihre Arbeit schnell im temporären Speicher des Browsers.</li>
                <li><strong>Export JSON:</strong> Lädt Ihre Arbeit als <code>.json</code> Datei herunter. Sie können diese Datei an Freunde oder Kollegen senden – sie können sie importieren und weiterarbeiten!</li>
                <li><strong>Import JSON:</strong> Laden Sie eine zuvor gespeicherte <code>.json</code> Datei hoch. Perfekt für Zusammenarbeit: Teilen Sie Ihre Mindmaps, lassen Sie andere ihre Ideen hinzufügen oder kombinieren Sie verschiedene Diagramme.</li>
                <li><strong>Screenshot:</strong> Speichert die aktuelle Ansicht als <code>.png</code> Bild.</li>
            </ul>
            <p><strong>📁 Beispiel‑Mindmaps (zum Herunterladen):</strong></p>
            <ul>
                <li><a href="examples/pot_vs_kin_energie.json" download>⚡ pot_vs_kin_energie.json</a> – Physikbeispiel (potentielle vs kinetische Energie)</li>
                <li><a href="examples/rudy.json" download>🎨 rudy.json</a> – ein verspieltes Selbstporträt</li>
                <li><a href="examples/versterker.json" download>🔊 versterker.json</a> – Verstärkerschaltplan / Elektronik</li>
                <li><a href="examples/weer.json" download>☁️ weer.json</a> – Wetter‑Mindmap</li>
            </ul>
            <p><em>Laden Sie ein Beispiel herunter und verwenden Sie <strong>Import JSON</strong>, um es zu laden und zu sehen, was Sie damit erstellen können!</em></p>
        `
    }
};
