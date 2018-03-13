import React, {Component} from 'react';
import tableData from './JSON/ClassicTable';
import chipData from './JSON/Chips'
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
// 1. Highlight specific shape and highlight other shapes
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
        this.betHistory    = [];
    }

    //================================
    // REACT COMPONENTS
    //================================

    componentDidMount() {
        this.pixiTableDesign     = new PIXI.Application(900, 350);
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        const TableContainer = document.querySelector('#App')

        const TableDesign = this.makeCanvas(this.pixiTableDesign, 'tableDesign', ['canvas', 'canvas-design']);

        // Make Design Canvas
        TableContainer.appendChild(TableDesign.view);

        this.buildTable();
    }

    //================================
    // GETTERS Obj; AND SETTERS Obj;
    //================================

    getChipAmountMap(key) {
        return this.chipAmountMap[String(key)];
    }

    setCipAmountMap(key, list) {
        this.chipAmountMap[String(key)] = list;
    }

    getChipValue() {
        return this.chipValue;
    }

    setChipValue(chipValue) {
        this.chipValue = chipValue;
    }

    getShapesMap(key) {
        return this.shapesMap[String(key)];
    }

    setShapeMap(key, list) {
        this.shapesMap[String(key)] = list;
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
            const universalKey      = lastBet.MapKey;
            const shapeMapped       = this.getShapesMap(universalKey)
            const chipText          = shapeMapped.Chip.ChipText;
            const chipModel         = shapeMapped.Chip.ChipModel;
            const currentBetAmount  = Number(chipText.text);
            const previousBetAmount = currentBetAmount - lastBet.Amount;

            if (chipText && chipModel) {

                if (previousBetAmount > 0) {
                    const path     = chipData.ChipPaths[String(previousBetAmount)];
                    const chipPath = path ? path : chipData.ChipPaths.defaultChip;

                    chipModel.image = PIXI.Sprite.fromImage(chipPath);
                    chipText.text   = previousBetAmount;

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
        this.refreshTable();
    }

    //================================
    // CANVAS HANDLERS
    //================================

    onShapeHoverIN(event) {
        const shapeMap = event.currentTarget.shapeMap;
        const Shape    = shapeMap.Shape.Graphic;

        Shape.beginFill(shapeMap.Shape.HoverBackColor, shapeMap.Shape.HoverBackColorAlpha);
        Shape.lineStyle(shapeMap.Shape.HoverBorderSize, shapeMap.Shape.HoverBorderColor);
        Shape.drawRect(shapeMap.Shape.X, shapeMap.Shape.Y, shapeMap.Shape.Width, shapeMap.Shape.Height);
        Shape.endFill();
    }

    onShapeHoverOUT(event) {
        const shapeMap = event.currentTarget.shapeMap;
        const Shape    = shapeMap.Shape.Graphic;

        Shape.beginFill(shapeMap.Shape.NormalBackColor, shapeMap.Shape.NornalBackColorAlpha);
        Shape.lineStyle(shapeMap.Shape.NormalBorderSize, shapeMap.Shape.NormalBorderColor);
        Shape.drawRect(shapeMap.Shape.X, shapeMap.Shape.Y, shapeMap.Shape.Width, shapeMap.Shape.Height);
        Shape.endFill();
    }

    onShapeClick(event) {
        if (!this.getChipValue()) {
            return;
        }
        const shapeMap = event.currentTarget.shapeMap;
        const Shape    = shapeMap.Shape.Graphic;

        const fontWeight    = chipData.ChipTextConfig.defaultWeight;
        const fontSize      = chipData.ChipTextConfig.defaultSize;
        const fontFamily    = chipData.ChipTextConfig.defaultFamily;
        const fontColor     = chipData.ChipTextConfig.defaultColor;
        const fontStroke    = chipData.ChipTextConfig.defaultStroke;
        const fontThickness = chipData.ChipTextConfig.defaultThickness;

        const universalKey = String(shapeMap.Text.String);
        const chipMapped   = this.getChipAmountMap(universalKey);

        const chipAmount    = this.getChipValue();
        // increase chip amount
        const chipNewAmount = chipMapped.Amount + chipAmount;

        const path     = chipData.ChipPaths[String(chipNewAmount)];
        const chipPath = path ? path : chipData.ChipPaths.defaultChip;

        const chipModel = shapeMap.Chip ? shapeMap.Chip.ChipModel : PIXI.Sprite.fromImage(chipPath);
        const chipText  = shapeMap.Chip ? shapeMap.Chip.ChipText : new PIXI.Text(String(chipAmount), {
            fontWeight:      fontWeight,
            fontSize:        fontSize,
            fontFamily:      fontFamily,
            fill:            fontColor,
            align:           'center',
            stroke:          fontStroke,
            strokeThickness: fontThickness
        })

        const chipWidth  = shapeMap.Shape.Width / 2;
        const chipHeight = shapeMap.Shape.Height / 2
        const chipX      = shapeMap.Shape.X + chipWidth;
        const chipY      = shapeMap.Shape.Y + chipHeight;

        if (chipModel && chipMapped.Amount > 0) {
            chipModel.image = PIXI.Sprite.fromImage(chipPath)
            chipText.text   = chipNewAmount;
        } else {
            chipModel.anchor.set(0.5)
            chipText.anchor.set(0.5);

            // ADD CHIP
            chipModel.width  = chipWidth
            chipModel.height = chipHeight
            chipModel.x      = chipX;
            chipModel.y      = chipY;

            chipText.x = chipX
            chipText.y = chipY

            this.pixiTableDesign.stage.addChild(chipModel, chipText);
        }

        const newShapeMapped = Object.assign(this.getShapesMap(universalKey), {
            Chip: {
                ChipModel: chipModel,
                ChipText:  chipText
            }
        });

        this.setShapeMap(universalKey, newShapeMapped)

        this.setBetHistory({
            MapKey: String(universalKey),
            Amount: chipAmount
        })

        this.setCipAmountMap(String(universalKey), {
            Amount: chipNewAmount
        })
    }

    //======================================
    // CANVAS ITEM - CREATE SHAPE WITH TEXT
    //======================================

    makeTableItem(args) {
        this.currentIndex += 1;
        const actualWidth      = args.Size.X - tableData.defaultBorderSize;
        const actualHeight     = args.Size.Y - tableData.defaultBorderSize;
        const fontSize         = args.FontSize || tableData.defaultFontSize;
        const fontFamily       = args.FontFamily || tableData.defaultFontFamily;
        const fontThickness    = args.FontThickness || tableData.defaultFontThickness;
        const fontWeight       = args.FontWeight || tableData.defaultFontWeight;
        const borderSize       = args.BorderSize || tableData.defaultBorderSize;
        const normalAlpha      = args.BackColorAlpha || tableData.defaultBackColorAlpha;
        const hoverBackColor   = args.HoverBackColor || tableData.defaultHoverBackColor;
        const hoverBorderColor = args.HoverBorderColor || tableData.defaultHoverBorderColor;
        const hoverAlpha       = args.HoverBackColorAlpha || tableData.defaultHoverBackColorAlpha;
        // CALL BACKS
        // * Can use default callbacks or your own!
        const clickCallBack = args.Events && args.Events.Click ? this[String(args.Events.Click)] : this.onShapeClick;
        const hoverInCallBack  = args.Events && args.Events.HoverIN ? this[String(args.Events.HoverIN)] : this.onShapeHoverIN;
        const hoverOUTCallBack  = args.Events && args.Events.HoverOUT ? this[String(args.Events.HoverOUT)] : this.onShapeHoverOUT;


        const shapeStr   = args.Text || "";
        const textHoriz  = (this.currentX + ((actualWidth + ((fontSize + fontThickness) / 2)) / 2))
        const textVerti  = this.currentY + (actualHeight / 2)
        const textConfig = {
            fontWeight:      fontWeight,
            fontSize:        fontSize,
            fontFamily:      fontFamily,
            fill:            args.TextColor,
            align:           'center',
            stroke:          args.TextColor,
            strokeThickness: fontThickness
        }

        // SET Chip Map
        this.setCipAmountMap(shapeStr, {
            Amount: 0
        });

        const Shape     = new PIXI.Graphics();
        const shapeText = new PIXI.Text(shapeStr, textConfig);

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
        shapeText.buttonMode  = true;
        Shape.interactive     = true;
        Shape.buttonMode      = true;


        // Event Handlers
        Shape
            .on('pointerover', hoverInCallBack.bind(this));
        shapeText
            .on('pointerover', hoverInCallBack.bind(this));

        Shape
            .on('pointerout', hoverOUTCallBack.bind(this));
        shapeText
            .on('pointerout', hoverOUTCallBack.bind(this));

        Shape
            .on('pointertap', clickCallBack.bind(this))
        shapeText
            .on('pointertap', clickCallBack.bind(this))

        this.pixiTableDesign.stage.addChild(Shape, shapeText);

        // This is required to map all shapes
        this.setShapeMap(args.Text, {
            Shape: {
                Width:                actualWidth,
                Height:               actualHeight,
                X:                    this.currentX,
                Y:                    this.currentY,
                NormalBorderSize:     borderSize,
                NormalBorderColor:    '0x' + args.Border.replace('#', ''),
                NormalBackColor:      '0x' + args.BackColor.replace('#', ''),
                NornalBackColorAlpha: normalAlpha,
                HoverBorderSize:      borderSize,
                HoverBackColor:       '0x' + hoverBackColor.replace('#', ''),
                HoverBackColorAlpha:  hoverAlpha,
                HoverBorderColor:     '0x' + hoverBorderColor.replace('#', ''),
                Graphic:              Shape
            },
            Text:  {
                String:  shapeStr,
                X:       textHoriz,
                Y:       textVerti,
                TextObj: shapeText,
            },
            Row:   this.currentRow,
            Index: this.currentIndex
        })

        // This is required to access it on event handler
        Shape.shapeMap     = this.getShapesMap(args.Text);
        shapeText.shapeMap = this.getShapesMap(args.Text);

        // Next X cord ->
        this.currentX += actualWidth;

        if (tableData['MaxPerRow'] == this.currentIndex) {
            this.currentY += actualHeight;

            this.pixiTableDesign.view.setAttribute('width', this.currentX + "px");
            this.pixiTableDesign.view.setAttribute('height', (this.currentY - (borderSize * tableData['MaxPerRow'])) + "px");
            this.currentRow += 1;
            this.currentX     = 0;
            this.currentIndex = 0;
        }
    }

    //======================================
    // BUILD TABLE >>
    //======================================

    buildTable() {
        this.currentY      = 0;
        this.currentX      = 0;
        this.currentRow    = 0;
        this.currentIndex  = 0;
        this.shapesMap     = {};
        this.betHistory    = [];
        this.chipAmountMap = {};

        this.setChipValue(100);

        Object.keys(tableData['Rows']).forEach((curRow, index) => {
            tableData['Rows'][curRow].map(this.makeTableItem.bind(this))
        })
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
        return (
            <div id="App" className="App">
                <div className="clearBets" onClick={this.clearBets.bind(this)}>Clear Bets</div>
                <div className="undoBet" onClick={this.undoBets.bind(this)}>Undo Bet</div>
            </div>
        );
    }
}

export default App;
