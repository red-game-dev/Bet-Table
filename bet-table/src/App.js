import React, {Component} from 'react';
import classicTable from './JSON/ClassicTable';
import transparentTable from './JSON/TransparentTable';
import chipData from './JSON/Chips'
import betTable from './JSON/BetTable';
import * as PIXI from 'pixi.js';
import './App.css';

// Mouse & touch events are normalized into
// the pointer* events for handling different
// button events.
//    .on('pointerdown', alert(this.currentX))
//    .on('pointerup', alert(this.currentX))
//    .on('pointerupoutside', alert(this.currentX))
//    .on('pointertap', () => console.log(this.currentY))
//    .on('pointerover', alert(this.currentX))
//    .on('pointerout', alert(this.currentX));

// Use mouse-only events
// .on('mousedown', onButtonDown)
// .on('mouseup', onButtonUp)
// .on('mouseupoutside', onButtonUp)
//.on('mouseover', alert(this.currentX))
// .on('mouseout', onButtonOut)

// Use touch-only events
//.on('touchstart', alert(this.currentX))
// .on('touchend', onButtonUp)
// .on('touchendoutside', onButtonUp)

// WHAT IS LEFT
// 2. Place Bets on more parts on each slot
// 3. Make the table look the same as origianl (Introducing Also Assets on Background, only if it has)
// 4. Use real chips for test
// 5. Refactor parts the right way (Is shiity atm, due is only made for simulation)

class App extends Component {

    //================================
    // __INIT__ / void main()
    //================================

    constructor(props) {
        super(props)

        this.chipAmountMap = {}
        this.betHistory = [];
        this.beforeRefreshHistory = [];
        this.currentTable = null;
    }

    //================================
    // REACT COMPONENTS
    //================================

    componentDidMount() {

        this.createPixiCanvas();

        this.buildTable();
    }

    //================================
    // GETTERS Obj; AND SETTERS Obj;
    //================================

    getChipAmountMap(key) {
        return this.chipAmountMap[String(key).replace(' ', '_')];
    }

    setCipAmountMap(key, list) {
        this.chipAmountMap[String(key).replace(' ', '_')] = list;
    }

    getChipValue() {
        return this.chipValue;
    }

    setChipValue(chipValue) {
        this.chipValue = chipValue;
    }

    getShapesMap(key) {
        return this.shapesMap[String(key).replace(' ', '_')];
    }

    setShapeMap(key, list) {
        this.shapesMap[String(key).replace(' ', '_')] = list;
    }

    getBetHistory(key) {
        return this.betHistory[key];
    }

    setBetHistory(list) {
        this.betHistory.push(list)
    }

    //========================
    // EXTERNAL FUNCTIONALITIES
    //========================

    undoBets() {
        const lastBet = this.getBetHistory(this.betHistory.length - 1)

        if (lastBet) {
            const universalKey = lastBet.MapKey;
            const shapeMapped = this.getShapesMap(universalKey)
            const chipText = shapeMapped.Chip.ChipText;
            const chipModel = shapeMapped.Chip.ChipModel;
            const currentBetAmount = Number(chipText.text);
            const previousBetAmount = currentBetAmount - lastBet.Amount;

            if (chipText && chipModel) {

                if (previousBetAmount > 0) {
                    const path = chipData.ChipPaths[String(previousBetAmount)];
                    const chipPath = path ? path : chipData.ChipPaths.defaultChip;

                    chipModel.image = PIXI.Sprite.fromImage(chipPath);
                    chipText.text = previousBetAmount;

                    this.setCipAmountMap(universalKey, {
                        Amount: previousBetAmount
                    })
                } else {
                    if (chipModel) {
                        chipModel.destroy()
                    }
                    if (chipText) {
                        chipText.destroy();
                    }

                    const newShapeMapped = Object.assign(this.getShapesMap(universalKey).Chip, {});
                    this.setShapeMap(universalKey, newShapeMapped)
                    this.setCipAmountMap(universalKey, {
                        Amount: 0
                    })
                }
            }

            const getIndex = this.betHistory.indexOf(lastBet)
            if (getIndex > -1) {
                this.betHistory.splice(getIndex, 1);
            }
        }
    }

    clearBets() {
        const betHistory = this.betHistory;
        this.betHistory = [];

        betHistory.map(currentBet => {
            console.log(currentBet)
            if (currentBet.MapKey) {
                const universalKey = currentBet.MapKey;
                const shapeMapped = this.getShapesMap(universalKey)

                if (shapeMapped.Chip) {
                    if (shapeMapped.Chip.ChipText) {
                        shapeMapped.Chip.ChipText.destroy();
                    }
                    if (shapeMapped.Chip.ChipModel) {
                        shapeMapped.Chip.ChipModel.destroy();
                    }

                    const newShapeMapped = Object.assign(this.getShapesMap(universalKey).Chip, {});
                    this.setShapeMap(universalKey, newShapeMapped)
                    this.setCipAmountMap(universalKey, {
                        Amount: 0
                    })
                }
            }
        })
    }

    repeatBets(){
        if(this.beforeRefreshHistory.length){

            this.beforeRefreshHistory.map(bet => {
                const universalKey = bet.MapKey;

                if(universalKey){
                    this.makeBet(this.getShapesMap(universalKey));
                }
            })
        }else if(this.betHistory.length){

            this.betHistory.map(bet => {
                const universalKey = bet.MapKey;

                if(universalKey){
                    this.makeBet(this.getShapesMap(universalKey));
                }
            })
        }
    }

    doubleBets(){
        if(this.beforeRefreshHistory.length){

            this.beforeRefreshHistory.map(bet => {
                const universalKey = bet.MapKey;

                const chipMapped = this.getChipAmountMap(universalKey);
                const chipNewAmount = chipMapped.Amount * 2;

                if(universalKey){
                    this.makeBet(this.getShapesMap(universalKey));
                }
            })
        }else if(this.betHistory.length){

            this.betHistory.map(bet => {
                const universalKey = bet.MapKey;

                const chipMapped = this.getChipAmountMap(universalKey);
                const chipNewAmount = chipMapped.Amount * 2;

                if(universalKey){
                    this.makeBet(this.getShapesMap(universalKey));
                }
            })
        }
    }

    makeBet(shapeMap){
        const Shape = shapeMap.Shape.Graphic;
        const BetAreas = shapeMap.BetAreas;

        const fontWeight = chipData.ChipTextConfig.defaultWeight;
        const fontSize = chipData.ChipTextConfig.defaultSize;
        const fontFamily = chipData.ChipTextConfig.defaultFamily;
        const fontColor = chipData.ChipTextConfig.defaultColor;
        const fontStroke = chipData.ChipTextConfig.defaultStroke;
        const fontThickness = chipData.ChipTextConfig.defaultThickness;

        const universalKey = String(shapeMap.Id);
        const chipMapped = this.getChipAmountMap(universalKey);

        const chipAmount = this.getChipValue();
        // increase chip amount
        const chipNewAmount = chipMapped.Amount + chipAmount;

        const path = chipData.ChipPaths[String(chipNewAmount)];
        const chipPath = path ? path : chipData.ChipPaths.defaultChip;

        const chipModel = shapeMap.Chip ? shapeMap.Chip.ChipModel : PIXI.Sprite.fromImage(chipPath);
        const chipText = shapeMap.Chip ? shapeMap.Chip.ChipText : new PIXI.Text(String(chipAmount), {
            fontWeight: fontWeight,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fill: fontColor,
            align: 'center',
            stroke: fontStroke,
            strokeThickness: fontThickness
        })

        const chipWidth = chipData.ChipConfig && chipData.ChipConfig.Width ? chipData.ChipConfig.Width : shapeMap.Shape.Width / 2;
        const chipHeight = chipData.ChipConfig && chipData.ChipConfig.Height ? chipData.ChipConfig.Height : shapeMap.Shape.Height / 2

        // we just need to change the cords of these biitchs, biitch x and biitch y
        const chipX = shapeMap.Shape.X + (shapeMap.Shape.Width / 2);
        const chipY = shapeMap.Shape.Y + (shapeMap.Shape.Height / 2);

        if (chipModel && chipMapped.Amount > 0) {
            chipModel.image = chipPath
            chipText.text = chipNewAmount;
        } else {

            // ADD CHIP
            chipModel.width = chipWidth
            chipModel.height = chipHeight
            chipModel.x = chipX;
            chipModel.y = chipY;

            chipText.x = chipX
            chipText.y = chipY

            chipModel.anchor.set(0.5)
            chipText.anchor.set(0.5);

            this.pixiTableDesign.stage.addChild(chipModel, chipText);
        }


        const newShapeMapped = Object.assign(this.getShapesMap(universalKey), {
            Chip: {
                ChipModel: chipModel,
                ChipText: chipText
            }
        });

        this.setShapeMap(universalKey, newShapeMapped)

        this.setBetHistory({
            MapKey: String(universalKey),
            Amount: chipAmount
        })

        this.setCipAmountMap(universalKey, {
            Amount: chipNewAmount
        })
    }

    switchTable(tableData, allowRefresh) {
        this.currentTable = tableData;
        this.beforeRefreshHistory = this.betHistory;

        if(allowRefresh) {
            this.clearBets();
            this.switchBuiltTable()
            this.repeatBets()
        }
    }

    //================================
    // CANVAS HANDLERS
    //================================

    onShapeBetHoverIN(event) {
        const shapeMap = event.currentTarget.shapeMap;
        const Shape = shapeMap.Shape.Graphic;

        Shape.beginFill(shapeMap.Shape.HoverBackColor, shapeMap.Shape.HoverBackColorAlpha);
        Shape.lineStyle(shapeMap.Shape.HoverBorderSize, shapeMap.Shape.HoverBorderColor);
        Shape.drawRect(shapeMap.Shape.X, shapeMap.Shape.Y, shapeMap.Shape.Width, shapeMap.Shape.Height);
        Shape.endFill();
    }

    onShapeBetHoverOUT(event) {
        const shapeMap = event.currentTarget.shapeMap;
        const Shape = shapeMap.Shape.Graphic;

        Shape.beginFill(shapeMap.Shape.NormalBackColor, shapeMap.Shape.NornalBackColorAlpha);
        Shape.lineStyle(shapeMap.Shape.NormalBorderSize, shapeMap.Shape.NormalBorderColor);
        Shape.drawRect(shapeMap.Shape.X, shapeMap.Shape.Y, shapeMap.Shape.Width, shapeMap.Shape.Height);
        Shape.endFill();
    }

    onShapeBetClick(event) {
        if (!this.getChipValue()) {
            return;
        }

        this.makeBet(event.currentTarget.shapeMap)
    }

    multiBetHoverInShapes(event) {
        const shapeMap = event.currentTarget.shapeMap;
        const Shape = shapeMap.Shape.Graphic;
        const highlightList = shapeMap.HighlightShapes;


        if (shapeMap.Config.HighlightShape) {
            Shape.beginFill(shapeMap.Shape.HoverBackColor, shapeMap.Shape.HoverBackColorAlpha);
            Shape.lineStyle(shapeMap.Shape.HoverBorderSize, shapeMap.Shape.HoverBorderColor);
            Shape.drawRect(shapeMap.Shape.X, shapeMap.Shape.Y, shapeMap.Shape.Width, shapeMap.Shape.Height);
            Shape.endFill();
        }

        Object.keys(highlightList).forEach((row, index) => {
            highlightList[row].map(shapeId => {
                const getShapeMapped = this.getShapesMap(shapeId);
                const shapeGraphic = getShapeMapped.Shape.Graphic;

                shapeGraphic.beginFill(getShapeMapped.Shape.HoverBackColor, getShapeMapped.Shape.HoverBackColorAlpha);
                shapeGraphic.lineStyle(getShapeMapped.Shape.HoverBorderSize, getShapeMapped.Shape.HoverBorderColor);
                shapeGraphic.drawRect(getShapeMapped.Shape.X, getShapeMapped.Shape.Y, getShapeMapped.Shape.Width, getShapeMapped.Shape.Height);
                shapeGraphic.endFill();
            })
        })
    }

    multiBetHoverOutShapes(event) {
        const shapeMap = event.currentTarget.shapeMap;
        const Shape = shapeMap.Shape.Graphic;
        const highlightList = shapeMap.HighlightShapes;

        if (shapeMap.Config.HighlightShape) {
            Shape.beginFill(shapeMap.Shape.NormalBackColor, shapeMap.Shape.NornalBackColorAlpha);
            Shape.lineStyle(shapeMap.Shape.NormalBorderSize, shapeMap.Shape.NormalBorderColor);
            Shape.drawRect(shapeMap.Shape.X, shapeMap.Shape.Y, shapeMap.Shape.Width, shapeMap.Shape.Height);
            Shape.endFill();
        }

        Object.keys(highlightList).forEach((row, index) => {
            highlightList[row].map(shapeId => {
                const getShapeMapped = this.getShapesMap(shapeId);
                const shapeGraphic = getShapeMapped.Shape.Graphic;

                shapeGraphic.beginFill(getShapeMapped.Shape.NormalBackColor, getShapeMapped.Shape.NornalBackColorAlpha);
                shapeGraphic.lineStyle(getShapeMapped.Shape.NormalBorderSize, getShapeMapped.Shape.NormalBorderColor);
                shapeGraphic.drawRect(getShapeMapped.Shape.X, getShapeMapped.Shape.Y, getShapeMapped.Shape.Width, getShapeMapped.Shape.Height);
                shapeGraphic.endFill();
            })
        })
    }

    //======================================
    // CANVAS ITEM - CREATE SHAPE WITH TEXT
    //======================================

    makeTableBetCell(args) {
        this.currentIndex += 1;

        const betAreaId = args.id;
        const actualWidth = args.Size.Width - this.currentTable.defaultBorderSize;
        const actualHeight = args.Size.Height - this.currentTable.defaultBorderSize;
        const borderSize = args.BorderSize || this.currentTable.defaultBorderSize;
        const normalAlpha = args.BackColorAlpha || this.currentTable.defaultBackColorAlpha;
        const highlightList = args.Highlight ? args.Highlight : {};
        const betAreasRowsCells = betTable['BetAreasRows'][String(this.currentRow)].length || 0;

        // CALL BACKS
        // * Can use default callbacks or your own!
        const clickCallBack = args.Events && args.Events.Click ? this[String(args.Events.Click)] : this.onShapeBetClick;
        const hoverInCallBack = args.Events && args.Events.HoverIN ? this[String(args.Events.HoverIN)] : this.multiBetHoverInShapes;
        const hoverOUTCallBack = args.Events && args.Events.HoverOUT ? this[String(args.Events.HoverOUT)] : this.multiBetHoverOutShapes;

        // SET Chip Map
        this.setCipAmountMap(betAreaId, {
            Amount: 0
        });

        const Cell = new PIXI.Graphics();

        // `this.currentTable.Development.IS_DEBUG_MODE` debugging mode for grid
        Cell.beginFill('0x' + "#66ccff".replace('#', ''), this.currentTable.Development.IS_DEBUG_MODE ? normalAlpha : 0);
        Cell.lineStyle(borderSize, '0x' + "#04080c".replace('#', ''), this.currentTable.Development.IS_DEBUG_MODE ? normalAlpha : 0);
        Cell.drawRect(this.currentX, this.currentY, actualWidth, actualHeight);
        Cell.endFill();

        Cell.interactive = true;
        Cell.buttonMode = true;

        Cell
            .on('pointertap', clickCallBack.bind(this))

        Cell
            .on('pointerover', hoverInCallBack.bind(this))

        Cell
            .on('pointerout', hoverOUTCallBack.bind(this))

        this.pixiTableDesign.stage.addChild(Cell);

        // This is required to map all shapes
        this.setShapeMap(betAreaId, {
            Config: {
                HighlightShape: false,
            },
            Shape: {
                Width: actualWidth,
                Height: actualHeight,
                X: this.currentX,
                Y: this.currentY,
                NormalBorderSize: borderSize,
                NornalBackColorAlpha: normalAlpha,
                Graphic: Cell
            },
            HighlightShapes: highlightList,
            Id: betAreaId,
            Row: this.currentRow,
            Index: this.currentIndex
        })

        // This is required to access it on event handler
        Cell.shapeMap = this.getShapesMap(betAreaId);

        this.currentX += actualWidth;
        if (betAreasRowsCells == this.currentIndex) {
            this.currentRow += 1;
            this.currentY += actualHeight;
            this.currentX = 10;
            this.currentIndex = 0;
        }
    }

    makeTableItem(args) {
        this.currentIndex += 1;

        const mainShapeId = args.id;
        const actualWidth = args.Size.Width - this.currentTable.defaultBorderSize;
        const actualHeight = args.Size.Height - this.currentTable.defaultBorderSize;
        const fontSize = args.FontSize || this.currentTable.defaultFontSize;
        const fontFamily = args.FontFamily || this.currentTable.defaultFontFamily;
        const fontThickness = args.FontThickness || this.currentTable.defaultFontThickness;
        const fontWeight = args.FontWeight || this.currentTable.defaultFontWeight;
        const borderSize = args.BorderSize || this.currentTable.defaultBorderSize;
        const normalAlpha = args.BackColorAlpha || this.currentTable.defaultBackColorAlpha;
        const hoverBackColor = args.HoverBackColor || this.currentTable.defaultHoverBackColor;
        const hoverBorderColor = args.HoverBorderColor || this.currentTable.defaultHoverBorderColor;
        const hoverAlpha = args.HoverBackColorAlpha || this.currentTable.defaultHoverBackColorAlpha;
        const highlightList = args.Highlight ? args.Highlight : {};

        // CALL BACKS
        // * Can use default callbacks or your own!
        const clickCallBack = args.Events && args.Events.Click ? this[String(args.Events.Click)] : () => {};
        const hoverInCallBack = args.Events && args.Events.HoverIN ? this[String(args.Events.HoverIN)] : () => {};
        const hoverOUTCallBack = args.Events && args.Events.HoverOUT ? this[String(args.Events.HoverOUT)] : () => {};

        const shapeStr = args.Text || "";
        const textHoriz = (this.currentX + ((actualWidth + ((fontSize + fontThickness) / 2)) / 2))
        const textVerti = this.currentY + (actualHeight / 2)
        const textConfig = {
            fontWeight: fontWeight,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fill: args.TextColor,
            align: 'center',
            stroke: args.TextColor,
            strokeThickness: fontThickness
        }

        // SET Chip Map
        this.setCipAmountMap(mainShapeId, {
            Amount: 0
        });

        const getPreviousShapeMap = this.getShapesMap(mainShapeId);

        const Shape = (getPreviousShapeMap && getPreviousShapeMap.Shape.Graphic) ? getPreviousShapeMap.Shape.Graphic : new PIXI.Graphics();
        const shapeText = (getPreviousShapeMap && getPreviousShapeMap.Text.TextObj) ? getPreviousShapeMap.Text.TextObj : new PIXI.Text(shapeStr, textConfig);

        // Make Shape
        Shape.beginFill('0x' + args.BackColor.replace('#', ''), normalAlpha);
        Shape.lineStyle(borderSize, '0x' + args.Border.replace('#', ''));
        Shape.drawRect(this.currentX, this.currentY, actualWidth, actualHeight);
        Shape.endFill();

        // Make Text inside shape
        shapeText.anchor.set(0.5);
        shapeText.x = textHoriz;
        shapeText.y = textVerti;

        // Create Interactivity
        shapeText.interactive = true;
        shapeText.buttonMode = true;
        Shape.interactive = true;
        Shape.buttonMode = true;

        // Event Handlers
        Shape
            .on('pointerover', hoverInCallBack.bind(this));

        Shape
            .on('pointerout', hoverOUTCallBack.bind(this));

        this.pixiTableDesign.stage.addChild(Shape, shapeText);

        // This is required to map all shapes
        this.setShapeMap(mainShapeId, {
            Config: {
                HighlightShape: true,
            },
            Shape: {
                Width: actualWidth,
                Height: actualHeight,
                X: this.currentX,
                Y: this.currentY,
                NormalBorderSize: borderSize,
                NormalBorderColor: '0x' + args.Border.replace('#', ''),
                NormalBackColor: '0x' + args.BackColor.replace('#', ''),
                NornalBackColorAlpha: normalAlpha,
                HoverBorderSize: borderSize,
                HoverBackColor: '0x' + hoverBackColor.replace('#', ''),
                HoverBackColorAlpha: hoverAlpha,
                HoverBorderColor: '0x' + hoverBorderColor.replace('#', ''),
                Graphic: Shape
            },
            Text: {
                String: shapeStr,
                X: textHoriz,
                Y: textVerti,
                TextObj: shapeText,
            },
            HighlightShapes: highlightList,
            Id: mainShapeId,
            Row: this.currentRow,
            Index: this.currentIndex
        })

        // This is required to access it on event handler
        Shape.shapeMap = this.getShapesMap(mainShapeId);
        shapeText.shapeMap = this.getShapesMap(mainShapeId);

        // Next X cord ->
        this.currentX += actualWidth;
        if (this.currentTable['MaxPerRow'][String(this.currentRow)] == this.currentIndex) {
            this.currentY += actualHeight;
            this.pixiTableDesign.view.setAttribute('width', this.currentX + "px");
            this.pixiTableDesign.view.setAttribute('height', (this.currentY - (borderSize * this.currentTable['MaxPerRow'][String(this.currentRow)])) + "px");
            this.currentRow += 1;
            this.currentX = 0;
            this.currentIndex = 0;
        }
    }

    //======================================
    // BUILD TABLE >>
    //======================================

    switchBuiltTable(){
        this.buildTableBackground();
        this.buildTableBetGrid();
    }

    buildTable() {
        this.shapesMap = {};
        this.betHistory = [];
        this.chipAmountMap = {};

        this.setChipValue(100);

        this.buildTableBackground();
        this.buildTableBetGrid();
    }

    buildTableBackground() {
        this.currentY = 0;
        this.currentX = 0;
        this.currentRow = 1;
        this.currentIndex = 0;

        Object.keys(this.currentTable['Rows']).forEach((curRow, index) => {
            this.currentTable['Rows'][curRow].map(this.makeTableItem.bind(this))
        })
    }

    buildTableBetGrid() {
        this.currentY = 15;
        this.currentX = 10;
        this.currentRow = 1;
        this.currentIndex = 0;

        Object.keys(betTable['BetAreasRows']).forEach((curRow, index) => {
            betTable['BetAreasRows'][curRow].map(this.makeTableBetCell.bind(this))
        })
    }

    createPixiCanvas() {
        this.pixiTableDesign = new PIXI.Application(900, 295);
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        const TableContainer = document.querySelector('#App')

        const TableDesign = this.makeCanvas(this.pixiTableDesign, 'tableDesign', ['canvas', 'canvas-design']);

        // Make Design Canvas
        TableContainer.appendChild(TableDesign.view);
    }

    //======================================
    // REFRSH TABLE
    //======================================
    refreshTable() {
        this.buildTable();
    }

    //======================================
    // MAKE CANVAS (U CAN CREATE MORE THAN 1)
    //======================================
    makeCanvas(app, canvasId, canvasClassList) {
        app.view.setAttribute('id', canvasId)
        canvasClassList.map(className => app.view.classList.add(className))

        return app;
    }

    //======================================
    // RENDER IT
    //======================================

    render() {
        this.switchTable(classicTable, false);

        return (
            <div id="App" className="App">
                <div className="clearBets" onClick={this.clearBets.bind(this)}>Clear Bets</div>
                <div className="undoBet" onClick={this.undoBets.bind(this)}>Undo Bet</div>
                <div className="repeatBet" onClick={this.repeatBets.bind(this)}>Repeat Bet</div>
                <div className="repeatBet" onClick={this.doubleBets.bind(this)}>Double Bet</div>
                <div className="switchClassic" onClick={this.switchTable.bind(this, classicTable)}>Switch Classic</div>
                <div className="switchTransparent" onClick={this.switchTable.bind(this, transparentTable)}>Switch Transparent</div>
            </div>
        );
    }
}

export default App;
