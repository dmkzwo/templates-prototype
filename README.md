# Templating Prototype

**Stand:** 22.11.2018

## Vorbemerkungen

Die hier skizzierte Struktur und Vorgehensweise kann noch Veränderungen unterliegen und in der finalen Version abweichen.
Sie soll einen Einblick in den aktuellen Stand geben, darf aber noch nicht als Basis für eine technische Umsetzung verwendet werden.

## Preview-Links

Der Einfachheit halber (kein Patternlab notwendig) werden die fertig umgesetzten Seiten noch einmal hier zum direkten Aufruf im Browser zur Verfügung gestellt:

http://bibb-test.dmkzwo-service.de/page.php?page=pages-contentpage-standard  
http://bibb-test.dmkzwo-service.de/page.php?page=pages-contentpage-standard-theme

Zugang: wie altes Template-System


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
    
Wenn nach Starten des Servers das Browser-Fenster leer bleiben sollte, führt eine kurze Veränderung der Fenstergröße zur korrekten Darstellung (Bug Pattern Lab).
    
Der Build-Prozess ist im Prototyp nicht enthalten.    
   
### Server starten

Zum Laden von Navigationsstrukturen per AJAX muss im Testbetrieb ein Server gestartet werden. Weitere Informationen s.u.

    cd server
    php -S localhost:2222
   
## Patterns (Atomic Design)

### Namensgebung

Die intern verwendeten Namen (Patterns, Style-Klassen) können durch die Verwendung des *title*-Eintrags in der zugehörigen Markdown-Datei (*.md) für die Ausgabe in Pattern Lab überschrieben werden.

Die Festlegung dieser Namen steht noch aus.


### Struktur (aktueller Stand)

Diese Struktur beeinhaltet nur die bisher benötigten Verzeichnisse und Patterns und wird im Projektverlauf kontinuierlich erweitert.

#### Atome

* *atoms/basic*: Elemente, die nur innerhalb eines Content-Containers etc. eingesetzt werden können (s.u.)
* *atoms/parts*: Elemente, die nur innerhalb übergeordneter Patterns verwendet werden
* *atoms/content*: Elemente, die in Content-Seiten direkt verwendet werden können (gemäß Namensvorgabe BIBB)
* *atoms/headlines*: Überschriften
* *atoms/header*: Elemente des Seitenkopfs     

#### Moleküle

* *molecules/basic*: Elemente, die nur innerhalb eines Content-Containers etc. eingesetzt werden können (s.u.)
* *molecules/content*: Elemente, die in Content-Seiten direkt verwendet werden können (gemäß Namensvorgabe BIBB)
* *molecules/parts*: Elemente, die nur innerhalb übergeordneter Patterns verwendet werden
* *molecules/headlines*: Überschriften
* *molecules/header*: Elemente des Seitenkopfs     

#### Organismen

* *organisms/basic*: Elemente, die nur innerhalb eines Content-Containers etc. eingesetzt werden können (s.u.)
* *organisms/content*: Elemente, die in Content-Seiten direkt verwendet werden können (gemäß Namensvorgabe BIBB)
* *organisms/header*: Elemente des Seitenkopfs     
* *organisms/navigation*: Navigations-Elemente
* *organisms/variants*: Varianten von Content-Elementen

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
* **js-** Style-Klassen, die als Ankerpunkte für Javascript-Interaktion fungieren

Soweit möglich und sinnvoll wurde eine Benennung nach dem **BEM**-Prinzip angewendet.

### Ausnahme Content-Container

HTML-Elemente die über einen RichText-Editor eingefügt werden, sollen nach Möglichkeit keine zusätzlichen Style-Klassen erhalten und weichen somit vom BEM-Prinzip ab.
Diese Patterns (Atome, Moleküle) sind jeweils im Unterverzeichnis *basic* zu finden.
Die notwendigen Styles finden sich bei den Organismen, die diese Patterns einbinden.

### Theming

Farb-Definitionen, die sich auf der Haupt- und den verschiedenen Portal-Seiten unterschiedlich aber konsistent verhalten müssen, werden jeweils über eine zusätzliche Stylesheet-Datei (theme-*.(s)css) definiert.
Im Falle der Hauptseite z.B. theme_bibb.scss. Dadurch wird eine einfache Anpassung des jeweiligen Farbschemas erreicht.
Diese Datei wird per Import in die zentrale SCSS-Datei (z.B. main-bibb.scss) integriert.

### Verarbeitung

Die SCSS-Dateien werden mit Gulp-Tasks verarbeitet bzw. optimiert (autoprefixer, lint, sourcemaps) und zu einer zentralen CSS-Datei zusammengefasst, die im HEAD eingebunden wird.

**Ausnahme:** Z.Z. wird die für die Lightbox notwendige CSS-Datei noch extra eingebunden.

## Javascript

### Dateistruktur

Ähnlich wie bei Stylesheets werden werden die Javascript-Module jeweils in JS-Dateien definiert, die im gleichen Verzeichnis wie die zugehörigen Pattern-Dateien (*.mustache) liegen.

### Verarbeitung

Die verschiedenen Javascript-Module werden per Webpack (ausgehend von main.js) zu einer zentralen Datei (build.js ) zusammengefasst und vor dem schließenden Body-Tag eingebunden. 


## Fonts / Icon-Fonts / Sprites

* Die notwendigen Text-Fonts werden extern von Google-Fonts eingebunden.
* Für Icons wird an wenigen Stellen (Theming) ein eigener Icon-Font verwendet.
* Alle anderen Icons werden als SVG-Sprites eingebunden.


## Hauptnavigation

Die Hauptnavigation ist auf Basis von AJAX umgesetzt, d.h. Layer mit Navigationsunterpunkten werden erst geladen, wenn sie benötigt werden.

### Dummy-Endpunkt

Da zur Zeit der Template-Erstellung keine serverseitige Quelle für die Seitenstrukturinformationen zur Verfügung stehen kann, wurde ein Testendpunkt erstellt (ajax.php), der auf Anfrage entsprechende Dummy-Daten zurückliefert.

Starten des Servers:

    cd server
    php -S localhost:2222
    
### Übergabe-Parameter

Der einzige Parameter ist die eindeutige **ID** der Seite, für die die entsprechenden Unternavigationspunkte abgefragt werden soll.

### Rückgabe-Format (JSON)

Nachfolgend ist die JSON-Rückgabe beispielhaft an einer Seite mit der fiktiven ID 29 (= Abfrage-Parameter) gezeigt.

**pid**: ID der jeweiligen Seite  
**level**: Tiefe der angefragten Seite in der Seitenstruktur  
**url**: Seiten-URL (hier der Einfachheit nur #)  
**label**: Link-Label  
**subItems**: Unternavigationspunkte  
**hasSubItems**: gibt an, ob diese Seite Unternavigationspunkte hat  

     {
       "pid": 29,
       "level": 2,
       "url": "#",
       "label": "Daten | Bildungsberichterstattung",
       "subItems": [
         {
           "pid": 291,
           "url": "#",
           "label": "Übergänge in Ausbildung",
           "hasSubItems": true
         },
         {
           "pid": 292,
           "url": "#",
           "label": "Ausbildung und Erwerbstätigkeit",
           "hasSubItems": true
         },
         {
           "pid": 293,
           "url": "#",
           "label": "Datenreport zum Berufsbildungsbericht",
           "hasSubItems": false
         },
         {
           "pid": 294,
           "url": "#",
           "label": "Indikatoren zur Bildungsberichterstattung",
           "hasSubItems": true
         },
         {
           "pid": 295,
           "url": "#",
           "label": "Integrierte Ausbildungsberichterstattung - iABE",
           "hasSubItems": true
         },
         {
           "pid": 296,
           "url": "#",
           "label": "Expertenmonitor",
           "hasSubItems": true
         },
         {
           "pid": 297,
           "url": "#",
           "label": "Referenz-Betriebs-System",
           "hasSubItems": true
         }
       ]
     }

### Initialisierung

Auf einer Unterseite soll die Navigation (beim ersten Klick) auf den passenden Hauptnavigationspunkt im korrekten Zustand also entsprechend aufgeklappt dargestellt werden.

Die dazu notwendigen Informationen werden der Navigation über ein DATA-Attribut (data-initial) mitgegeben. Im Falle der für das Template bespielhaft ausgewählten Unterseite wäre dies:

    <nav class="fr-main-navigation js-main-navigation"
        data-initial='[
            {"pid": "2", "label": "Themen"}, 
            {"pid": "29", "label": "Daten | Bildungsberichterstattung"}, 
            {"pid": "292", "label": "Ausbildung und Erwerbstätigkeit"}, 
            {"pid": "2926", "label": "Nicht formal Qualifizierte (nfQ)", "subItems": false}]'>
            ...
    </nav>
    
### Bitte beachten

Da es sich um ein Template handelt, kann die Navigation nicht *durchgeklickt* werden. Es kann auf einem beispielhaften vordefinierten Pfad aber das Verhalten der Navigationslayer getestet werden.

Der Pfad der gewählten Beispielseite lautet:

*Themen* > *Daten | Bildungsberichterstattung* > *Ausbildung und Erwerbstätigkeit* > *Nicht formal Qualifizierte (nfQ)*

In diesem Zustand öffnet sich auch die Navigation beim ersten Klick auf *Themen*

Desweiteren ist der Punkt *Ausbildungsvergütung* (Unterpunkte) verlinkt


## Beispielseiten

*pages/Inhaltsseite Standard*  
*pages/Inhaltsseite Standard (lange Texte)* - wie oben, nur mit längeren Texten (Zeilenumbrüche) an relevanten Stellen  
*pages/Inhaltsseite Standard (Theme)* - wie oben, nur geänderten Key-Colors  
  
     
 ## Bekannte Probleme
 
 * Die Lightbox funktioniert nicht innerhalb von PatternLab
 * Ein Bug in Edge führt dazu, dass Javascript Events nicht immer verarbeitet werden
 
 