module.exports = function(app) {
  var express = require('express');
  var startupsRouter = express.Router();

  app.users = [
    {
      Id: 1,
      Name: '初始账户',
      Password: 'hhhhhh',
      Role: 1,
      Phone:'1',
      Email:'',
      IsSignNeeded:true,
      IsEnable:true,
      Signature:'111',
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    },
    {
      Id: 2,
      Name: '试件记录员',
      Password: 'hhhhhh',
      Role: 2,
      Phone:'2',
      Email:'',
      IsSignNeeded:true,
      IsEnable:true,
      Signature:'111',
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    },
    {
      Id: 3,
      Name: '打印工',
      Password: 'hhhhhh',
      Role: 3,
      Phone:'3',
      Email:'',
      IsSignNeeded:true,
      IsEnable:true,
      Signature:'111',
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    },{
      Id: 4,
      Name: 'guest',
      Password: 'hhhhhh',
      Role: 4,
      Phone:'4',
      Email:'',
      IsSignNeeded:true,
      IsEnable:true,
      Signature:'222',
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    }
  ];

  app.powers = [
    {
      Id: 1,
      Name: '系统设置',
      Description: '设置系统基础资料'
    },{
      Id: 2,
      Name: '试件管理',
      Description: '添加、删除、修改试件信息',
    },{
      Id: 3,
      Name: '试件打印',
      Description: '打印试件二维码'
    },{
      Id: 4,
      Name: '试件扫码',
      Description: '扫描二维码查看试件信息'
    }
  ];

  app.roles = [
    {
      Id: 1,
      Name: '系统管理员',
      Powers: [1,2],
      Description: '系统管理员作为系统中最高级别角色，有最高级别功能权限。',
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    },{
      Id: 2,
      Name: '试件管理员',
      Powers: [2,3],
      Description: '试件管理员作为系统中试件管理人员，主要负责维护试件信息。',
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    },{
      Id: 3,
      Name: '试件打印员',
      Powers: [3],
      Description: '试件打印员可以查看试件信息并打印为二维码。',
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    },{
      Id: 4,
      Name: '游客',
      Powers: [4],
      Description: '游客可以扫描二维码查看试件信息。',
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    }
  ];

  // app.projects = [
  //   {
  //     Id: 1,
  //     Name: '项目1',
  //     IsEnable: true,
  //     Description: '项目1描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 2,
  //     Name: '项目2',
  //     IsEnable: true,
  //     Description: '项目2描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 3,
  //     Name: '项目3',
  //     IsEnable: true,
  //     Description: '项目3描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 4,
  //     Name: '项目4',
  //     IsEnable: true,
  //     Description: '项目4描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 5,
  //     Name: '项目5',
  //     IsEnable: false,
  //     Description: '项目5描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   }
  // ];

  // app.departments = [
  //   {
  //     Id: 1,
  //     Name: '部门1',
  //     Description: '部门1描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 2,
  //     Name: '部门2',
  //     Description: '部门2描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 3,
  //     Name: '部门3',
  //     Description: '部门3描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 4,
  //     Name: '部门4',
  //     Description: '部门4描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 5,
  //     Name: '部门5',
  //     Description: '部门5描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   }
  // ];

  // app.oils = [
  //   {
  //     Id: 1,
  //     Name: '油品1',
  //     YellowRate: 8,
  //     RedRate: 10,
  //     Description: '油品1描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 2,
  //     Name: '油品2',
  //     YellowRate: 10,
  //     RedRate: 12,
  //     Description: '油品2描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 3,
  //     Name: '油品3',
  //     YellowRate: 12,
  //     RedRate: 14,
  //     Description: '油品3描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 4,
  //     Name: '油品4',
  //     YellowRate: 14,
  //     RedRate: 16,
  //     Description: '油品4描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   }
  // ];

  app.preferences = [
    {
      Id: 1,
      ShortcutHour: 5,
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    }
  ];

  // app.cars = [
  //   {
  //     Id: 1,
  //     Number: '车辆1',
  //     Vin: '123456',
  //     Model: '模型1',
  //     IsArchived: false,
  //     InstanceCount:0,
  //     BillCount:0,
  //     LastOil:null,
  //     LastVolume:0,
  //     LastMileage:0,
  //     Description: '车辆1描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 2,
  //     Number: '车辆2',
  //     Vin: '6921505026477',
  //     Model: '模型2',
  //     IsArchived: false,
  //     InstanceCount:0,
  //     BillCount:0,
  //     LastOil:null,
  //     LastVolume:0,
  //     LastMileage:0,
  //     Description: '车辆2描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 3,
  //     Number: '车辆3',
  //     Vin: '345678',
  //     Model: '模型3',
  //     IsArchived: false,
  //     InstanceCount:0,
  //     BillCount:0,
  //     LastOil:null,
  //     LastVolume:0,
  //     LastMileage:0,
  //     Description: '车辆3描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 4,
  //     Number: '车辆4',
  //     Vin: '456789',
  //     Model: '模型4',
  //     IsArchived: false,
  //     InstanceCount:0,
  //     BillCount:0,
  //     LastOil:null,
  //     LastVolume:0,
  //     LastMileage:0,
  //     Description: '车辆4描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 5,
  //     Number: '车辆5',
  //     Vin: '567890',
  //     Model: '模型5',
  //     IsArchived: false,
  //     InstanceCount:0,
  //     BillCount:0,
  //     LastOil:null,
  //     LastVolume:0,
  //     LastMileage:0,
  //     Description: '车辆5描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   },{
  //     Id: 6,
  //     Number: '车辆6',
  //     Vin: '667890',
  //     Model: '模型6',
  //     IsArchived: true,
  //     InstanceCount:0,
  //     BillCount:0,
  //     LastOil:null,
  //     LastVolume:0,
  //     LastMileage:0,
  //     Description: '车辆6描述',
  //     Creater: 1,
  //     CreatedDate: new Date(),
  //     Modifier: 1,
  //     ModifiedDate: new Date()
  //   }
  // ];

  app.pieces = [
    {
      Id: 1,
      Name: '外后视镜1',
      Number: '123456',
      Order: '160429-0001',
      Count:10,
      PrintedCount:0,
      IsPrinted: false,
      Ots:"OTS1",
      DelegateNumber:"TPGT-B-038",
      AccessoryFactory:"xxx",
      VehicleType:"C Model1",
      TestContent:"镜面抖动测量",
      SendPerson:"李三",
      ChargePerson:"左中明",
      SendDate: null,
      Place:"3楼整车测量准备间",
      IsEnable: true,
      Description: '外后视镜1描述',
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    },{
      Id: 2,
      Name: '外后视镜2',
      Number: '6921505026477',
      Order: '160429-0002',
      Count:8,
      PrintedCount:8,
      IsPrinted: true,
      Ots:"OTS1",
      DelegateNumber:"TPGT-B-038",
      AccessoryFactory:"xxx",
      VehicleType:"C Model1",
      TestContent:"镜面抖动测量",
      SendPerson:"李三",
      ChargePerson:"左中明",
      SendDate: new Date(),
      Place:"3楼整车测量准备间",
      IsEnable: true,
      Description: '外后视镜2描述',
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    },{
      Id: 3,
      Name: '外后视镜3',
      Number: '345678',
      Order: '160429-0003',
      Count:12,
      PrintedCount:0,
      IsPrinted: false,
      Ots:"OTS1",
      DelegateNumber:"TPGT-B-038",
      AccessoryFactory:"xxx",
      VehicleType:"C Model1",
      TestContent:"镜面抖动测量",
      SendPerson:"李三",
      ChargePerson:"左中明",
      SendDate: new Date(),
      Place:"3楼整车测量准备间",
      IsEnable: true,
      Description: '外后视镜3描述',
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    },{
      Id: 4,
      Name: '外后视镜4',
      Number: '456789',
      Order: '160429-0004',
      Count:13,
      PrintedCount:0,
      IsPrinted: false,
      Ots:"OTS1",
      DelegateNumber:"TPGT-B-038",
      AccessoryFactory:"xxx",
      VehicleType:"C Model1",
      TestContent:"镜面抖动测量",
      SendPerson:"李三",
      ChargePerson:"左中明",
      SendDate: new Date(),
      Place:"3楼整车测量准备间",
      IsEnable: true,
      Description: '外后视镜4描述',
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    },{
      Id: 5,
      Name: '外后视镜5',
      Number: '567890',
      Order: '160429-0005',
      Count:18,
      PrintedCount:0,
      IsPrinted: false,
      Ots:"OTS1",
      DelegateNumber:"TPGT-B-038",
      AccessoryFactory:"xxx",
      VehicleType:"C Model1",
      TestContent:"镜面抖动测量",
      SendPerson:"李三",
      ChargePerson:"左中明",
      SendDate: new Date(),
      Place:"3楼整车测量准备间",
      IsEnable: true,
      Description: '外后视镜5描述',
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    },{
      Id: 6,
      Name: '外后视镜6',
      Number: '667890',
      Order: '模型6',
      Count:10,
      PrintedCount:0,
      IsPrinted: false,
      Ots:"OTS1",
      DelegateNumber:"TPGT-B-038",
      AccessoryFactory:"xxx",
      VehicleType:"C Model1",
      TestContent:"镜面抖动测量",
      SendPerson:"李三",
      ChargePerson:"左中明",
      SendDate: new Date(),
      Place:"3楼整车测量准备间",
      IsEnable: true,
      Description: '外后视镜6描述',
      Creater: 1,
      CreatedDate: new Date(),
      Modifier: 1,
      ModifiedDate: new Date()
    }
  ];

  // app.signatures = [];

  // app.instances = [];
  // app.traces = [];
  // app.bills = [];
  // app.messages = [];
  app.deleteds = [];

  startupsRouter.get('/', function(req, res) {
    res.send({
      'startups': []
    });
  });

  startupsRouter.post('/', function(req, res) {
    // res.status(201).end();

        // var errors = {
        //   ServerSideError:'名称重复'
        // };
        // res.status(422).send({ 'errors': errors});

    var startup = {};
    startup["Users"] = app.users;
    startup["Roles"] = app.roles;
    startup["Powers"] = app.powers;
    startup["Projects"] = app.projects;
    startup["Departments"] = app.departments;
    startup["Oils"] = app.oils;
    startup["Preferences"] = app.preferences;
    startup["Cars"] = app.cars;
    startup["Instances"] = app.instances;
    startup["Traces"] = app.traces;
    startup["Bills"] = app.bills;
    startup["Messages"] = app.messages;
    startup["Signatures"] = app.signatures;
    startup["Pieces"] = app.pieces;
    startup["SyncToken"] = new Date();
    res.status(201).send({ 'Startup': startup });
    
  });

  startupsRouter.get('/:id', function(req, res) {
    var startup = {};
    startup["Id"] = 1;
    startup["Users"] = app.users;
    startup["Roles"] = app.roles;
    startup["Powers"] = app.powers;
    startup["Projects"] = app.projects;
    startup["Departments"] = app.departments;
    startup["Oils"] = app.oils;
    startup["Preferences"] = app.preferences;
    // startup["Cars"] = app.cars;
    // startup["Instances"] = app.instances;
    // startup["Traces"] = app.traces;
    startup["Bills"] = app.bills;
    startup["Messages"] = app.messages;
    startup["Pieces"] = app.pieces;
    startup["Signatures"] = app.signatures;
    startup["SyncToken"] = new Date();
    res.send({
      'Startup': startup
    });
  });

  startupsRouter.put('/:id', function(req, res) {
    res.send({
      'startups': {
        id: req.params.id
      }
    });
  });

  startupsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/startups', startupsRouter);
};
