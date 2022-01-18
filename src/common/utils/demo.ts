import { subDays, eachDayOfInterval, addHours } from 'date-fns';
import { Entities } from 'common/enums';
import { INIT_STATE } from 'common/assets';
import { getRandomInt, sumByProp, getTimestamp } from 'common/utils';
import { AppState, Item, OrderClosingReasons } from 'common/types';
import { createItemActions, createCategoryActions, createTaxActions, createOrdersActions } from 'common/creators';
import * as I from './images';

export function getDemoData(): AppState {
  const initialState: AppState = {
    ...INIT_STATE,
    settings: {
      ...INIT_STATE.settings,
      name: 'ETF Coffee Bar',
    },
  };

  function getFakeState(initialValue: AppState): { state: () => AppState; setState: (newValue: AppState) => void } {
    let value = initialValue;
    return {
      state: () => value,
      setState: (newValue: AppState) => {
        value = newValue;
      },
    };
  }

  const { state, setState } = getFakeState(initialState);

  const updateState = (value: Partial<AppState>) => {
    const newState = { ...state(), ...value };
    setState(newState); // update state
  };

  const categories = () => createCategoryActions(state(), updateState);
  const taxes = () => createTaxActions(state(), updateState);
  const items = () => createItemActions(state(), updateState);
  const orders = () => createOrdersActions(state(), updateState);


  const gazirana = categories().add({
    name: 'Gazirana pića',
    parentId: 'root',
    color: 'red',
    picture: I.soft,
  });
  const priroda = categories().add({
    name: 'Prirodni sokovi',
    parentId: 'root',
    color: 'tomato',
    picture: I.sokovi,
  });
  const topla = categories().add({
    name: 'Topli napitci',
    parentId: 'root',
    color: 'coral',
    picture: I.napitci,
  });
  const subcat = categories().add({
    name: 'Hrana',
    parentId: 'root',
    color: 'gold',
    picture: I.hrana,
  });

  taxes().add({
    name: 'Porez',
    applyToCustomAmounts: false,
    isEnabled: true,
    isIncludedInPrice: true,
    precentage: 17,
  });

  const taxList = state()
    .taxes.filter((tax) => tax.isEnabled && !tax.isDeleted)
    .map((tax) => tax.id);

  const itemsList: Partial<Item>[] = [

    {
      name:'Red bull',
      barcode:'',
      color:'transparent',
      parentId:'root',
      picture: I.redbull,
      price:5,
      costPrice:2.3,
      taxes: taxList,
    },
    {
      name:'Mineralna voda',
      barcode:'',
      color:'transparent',
      parentId:'root',
      picture: I.kiseljak,
      price:2,
      costPrice:0.7,
      taxes: taxList,
    },

    {
      name:'Cedevita',
      barcode:'',
      color:'orange',
      parentId:'root',
      picture: I.cedevita,
      price:2.5,
      costPrice:0.5,
      taxes: taxList,
    },

    {
      name:'Voda',
      barcode:'',
      color:null,
      parentId:'root',
      picture: I.olimpija,
      price:2,
      costPrice:0.5,
      taxes: taxList,
    },

    {
      name:'Sok od borovnice',
      barcode:'',
      color:'red',
      parentId:priroda.id,
      picture: I.borovnica,
      price:5,
      costPrice:3,
      taxes: taxList,
    },

    {
      name:'Sok od narandže',
      barcode:'',
      color:'orange',
      parentId:priroda.id,
      picture:I.narandza,
      price:5,
      costPrice:3,
      taxes: taxList,
    },

    {
      name:'Sok od jagode',
      barcode:'',
      color:'red',
      parentId:priroda.id,
      picture:I.jagoda,
      price:5,
      costPrice:3,
      taxes: taxList,
    },

    {
      name:'Sok od jabuke',
      barcode:'',
      color:'salmon',
      parentId:priroda.id,
      picture:I.jabuka,
      price:5,
      costPrice:3,
      taxes: taxList,
    },

    {
      name:'Sok od breskve',
      barcode:'',
      color:'gold',
      parentId:priroda.id,
      picture: I.breskva,
      price:3,
      costPrice:1,
      taxes: taxList,
    },

    {
      name:'Coca Cola',
      barcode:'',
      color:'red',
      parentId:gazirana.id,
      picture:I.cocaCola,
      price:3,
      costPrice:1,
      taxes: taxList,
    },

    {
      name:'Fanta',
      barcode:'',
      color:'orange',
      parentId:gazirana.id,
      picture: I.fanta,
      price:3,
      costPrice:1,
      taxes: taxList,
    },

    {
      name:'Sprite',
      barcode:'',
      color:null,
      parentId:gazirana.id,
      picture: I.sprite,
      price:3,
      costPrice:1,
    },

    {
      name:'Schweppes Bitter Lemon',
      barcode:'',
      color:'gold',
      parentId:gazirana.id,
      picture: I.sveps,
      price:3,
      costPrice:1,
      taxes: taxList,
    },

    {
      name:'Coca Cola Zero',
      barcode:'',
      color:'red',
      parentId:gazirana.id,
      picture: I.cocaZero,
      price:3,
      costPrice:1,
      taxes: taxList,
    },

    {
      name:'Topla čokolada',
      barcode:'',
      color:'gold',
      parentId: topla.id,
      picture: I.cokolada,
      price: 4,
      costPrice:2,
      taxes: taxList,
    },

    {
      name:'Hamburger',
      barcode:'',
      color: 'red',
      parentId: subcat.id,
      picture: I.hambas,
      price:7,
      costPrice:3,
      taxes: taxList,
    },

    {
      name:'Cheeseburger',
      barcode:'',
      color:'tomato',
      parentId:subcat.id,
      picture: I.ciz,
      price: 8,
      costPrice: 4,
      taxes: taxList,
    },

    {
      name:'Hot dog',
      barcode:'',
      color:'coral',
      parentId:subcat.id,
      picture: I.dog,
      price: 3,
      costPrice: 1,
      taxes: taxList,
    },

    {
      name:'Espresso',
      barcode:'',
      color:'null',
      parentId:topla.id,
      picture: I.kafa,
      price :2.5,
      costPrice: 0.7,
      taxes: taxList,
    },

    /*{
      name: 'Espresso',
      barcode: '',
      color: null,
      parentId: Entities.RootCategoryId,
      picture: I.espresso,
      price: 5,
      costPrice: 3.5,
      taxes: taxList,
    },
    {
      name: 'Caffe Americano',
      barcode: '',
      color: null,
      parentId: Entities.RootCategoryId,
      picture: I.caffeAmericano,
      price: 7,
      costPrice: 5.5,
      taxes: taxList,
    },

    {
      name: 'Cappucino',
      barcode: '',
      color: null,
      parentId: Entities.RootCategoryId,
      picture: I.cappucino,
      price: 6,
      costPrice: 5,
      taxes: taxList,
    },
    {
      name: 'Earl Grey',
      barcode: '',
      color: null,
      parentId: Entities.RootCategoryId,
      picture: I.earlGrey,
      price: 6,
      costPrice: 3,
      taxes: taxList,
    },
    {
      name: 'Caffe Mocha',
      barcode: '',
      color: null,
      parentId: Entities.RootCategoryId,
      picture: I.caffeMocha,
      price: 6,
      costPrice: 4.2,
      taxes: taxList,
    },
    {
      name: 'Chicken Burger',
      barcode: '',
      color: 'orange',
      parentId: subcat.id,
      picture: null,
      price: 6,
      costPrice: 4.2,
      taxes: taxList,
    },
    {
      name: 'Fish Sandwich',
      barcode: '',
      color: 'salmon',
      parentId: subcat.id,
      picture: null,
      price: 12,
      costPrice: 7,
      taxes: taxList,
    },*/
  ];

  itemsList.forEach((entity) => items().add(entity));

  const dateRange = { start: subDays(new Date(), 180), end: new Date() };
  const rangeDays = eachDayOfInterval(dateRange);

  rangeDays.forEach((day) => {
    const itemsList = state().items;
    const itemsCount = itemsList.length - 1;
    const itemIds = Array.from({ length: getRandomInt(1, itemsCount) }, () => getRandomInt(0, itemsCount));

    for (let i = 1; i < getRandomInt(1, 30); i += 1) {
      const order = orders().add();

      itemIds.forEach((itemId) => orders().addItem(itemsList[itemId], order.id));

      const paymentAmount = sumByProp('amount', order.items);

      orders().charge(
        {
          cardPaymentAmount: 0,
          cashChange: 0,
          cashPaymentAmount: paymentAmount,
          closingReason: OrderClosingReasons.Default,
          customerId: 0,
          isDiscounted: false,
          totalPaymentAmount: paymentAmount,
          dateClose: getTimestamp(addHours(day, getRandomInt(0, 23))),
        },
        order.id,
      );
    }
  });

  return state();
}
