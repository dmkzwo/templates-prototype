# Templating Prototype

## Vorbemerkungen

Im folgenden Dokument werden die Begriffe *Pattern* und *Template* synomym verwendet.

Die hier skizzierte Struktur und Vorgehensweise kann noch Veränderungen unterliegen und in der finalen Version abweichen.

## Installation

### Voraussetzungen

* git
* node (>= v8*)
* gulp (cli global)

### Pattern Lab einrichten

Clone mittels SSH:

    git clone git@github.com:dmkzwo/templates-prototype.git

oder Clone mittels HTTPS:    

    git clone https://github.com/dmkzwo/templates-prototype.git
    
Installation von Abhängigkeiten:
    
    cd templates-prototype
    npm install
    
### Pattern Lab starten
    
    gulp patternlab:serve
    
Der Build-Prozess ist im Prototype nicht enthalten.    
   
   
## Patterns (Atomic Design)

### Namensgebung

Die intern verwendeten Namen (Patterns, Style-Klassen) können durch die Verwendung des *title*-Eintrags in der zugehörigen Markdown-Datei (*.md) für die Ausgabe in Pattern Lab überschrieben werden.

Die Festlegung dieser Namen steht noch aus.


### Struktur (aktueller Stand)

Diese Struktur beeinhaltet nur die bisher benötigten Verzeichnisse und Patterns und wird im Projektverlauf kontinuierlich erweitert.

#### Atome

* *atoms/basic*: Elemente, die nur innerhalb eines Content-Containers etc. eingesetzt werden können (s.u.)
* *atoms/parts*: Elemente, die nur innerhalb übergeordneter Patterns verwendet werden
* *atoms/headlines*: Überschriften
* *atoms/header*: Elemente des Seitenkopfs     

#### Moleküle

* *molecules/basic*: Elemente, die nur innerhalb eines Content-Containers etc. eingesetzt werden können (s.u.)
* *molecules/content*: *einsatzbereite* Elemente
* *molecules/parts*: Elemente, die nur innerhalb übergeordneter Patterns verwendet werden
* *molecules/headlines*: Überschriften
* *molecules/header*: Elemente des Seitenkopfs     

#### Organismen

* *organisms/content*: *einsatzbereite* Elemente
* *organisms/header*: Elemente des Seitenkopfs     

#### Templates

* *templates/contentpages*: Innenseiten

#### Pages

* *pages/contentpages*: Innenseiten



## Stylesheets

### Dateistruktur

Die elementspezischen Styles werden in SCSS-Dateien definiert, die im gleichen Verzeichnis wie die zugehörigen Pattern-Dateien (*.mustache) liegen.
Dabei wird zu Gunsten einer größeren Übersichtlichkeit auf eine 1:1 Zuordnung von Stylesheets und Patterns verzichtet.
Wenn z.B. ein Pattern (häufig ein Atom) nicht *standalone* verwendet werden kann, wird die zugehörige Style-Definition auf einer höheren Ebene (Molekül, Organismus) integriert.

Beispiel: *link-block*

### Namenskonvention

Style-Klassen von externen Frameworks (Bootstrap) und Paketen werden unverändert übernommen.

Die Namen der projektspezifischen Style-Klassen und -Dateien korrelieren jeweils mit den Patterns, in denen sie eingesetzt werden.

Zusätzlich kommen folgende Namespaces (Prefixes) zum Einsatz:

* **c-** Style-Klassen für Content-Elemente
* **fr-** Style-Klassen für Layout und übergreifende Seiten-Elemente (z.B. Navigation)
* **th-** Style-Klassen, die das Farbschema steuern (Theming, s.u.)
* **js-** Style-Klassen, die als Ankerpunkte für Javascript-Interaktion fungieren
* **h-** Helfer-Klassen

### Theming

Farb-Definitionen, die sich auf der Haupt- und den verschiedenen Portal-Seiten unterschiedlich aber konsistent verhalten müssen, werden jeweils über eine zusätzliche Stylesheet-Datei (theme-*.(s)css) definiert.
Im Falle der Hauptseite z.B. theme_bibb.(s)css. Dadurch wird eine einfache Anpassung des jeweiligen Farbschemas erreicht.
In dieser Datei werden alle Style-Klassen mit dem Namespace *th-* definiert.

