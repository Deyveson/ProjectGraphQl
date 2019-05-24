import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from './../interfaces/ModelsInterface';

export interface ItensPedidoAttributes {
  codpedido: number;
  codpedidoitem?: number;
  fornecedor_emp?: number;
  fornecedor_cod?: number;
  produto?: string;
  quantidade?: number;
  vl_item?: number;
  vl_total?: number;
  unidade?: string;
  embalagem?: number;
  qtd_estoque?: number;
}

export interface ItensPedidoInstance
  extends Sequelize.Instance<ItensPedidoAttributes>,
    ItensPedidoAttributes {}

export interface ItensPedidoModel
  extends BaseModelInterface,
    Sequelize.Model<ItensPedidoInstance, ItensPedidoAttributes> {}

export default (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes,
): ItensPedidoModel => {
  const ItensPedido: ItensPedidoModel = sequelize.define(
    'ItensPedido',
    {
      codpedido: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      codpedidoitem: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
      },
      fornecedor_emp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fornecedor_cod: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      produto: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vl_item: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      vl_total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      unidade: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      embalagem: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qtd_estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      schema: 'b2b',
      tableName: 'pedidos_itens',
      timestamps: false,
    },
  );

  ItensPedido.associate = (models: ModelsInterface): void => {
    ItensPedido.belongsTo(models.Pedido, {
      as: 'pedidos',
      foreignKey: 'codpedido',
    });
  };

  return ItensPedido;
};
