import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from './../interfaces/ModelsInterface';

export interface PedidoAttributes {
  codpedido: number;
  codfilial?: number;
  codfuncionario?: number;
  codcliente?: number;
  condicao?: number;
  emissao?: Date;
  situacao?: string;
  total?: number;
  observacao?: string;
  ordem_compra?: string;
}

export interface PedidoInstance extends Sequelize.Instance<PedidoAttributes>, PedidoAttributes {}

export interface PedidoModel
  extends BaseModelInterface,
    Sequelize.Model<PedidoInstance, PedidoAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PedidoModel => {
  const Pedido: PedidoModel = sequelize.define(
    'Pedido',
    {
      codpedido: {
        type: DataTypes.BIGINT,
        allowNull: true,
        primaryKey: true,
        autoIncrement: false,
      },
      codfilial: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      codfuncionario: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      codcliente: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      condicao: {
        type: DataTypes.STRING(7),
        allowNull: false,
      },
      emissao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      situacao: {
        type: DataTypes.STRING(1),
        allowNull: false,
        defaultValue: ' ',
      },
      total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      observacao: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      ordem_compra: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      schema: 'b2b',
      tableName: 'pedidos',
      timestamps: false,
    },
  );

  Pedido.associate = (models: ModelsInterface): void => {
    Pedido.hasMany(models.ItensPedido, {
      as: 'pedidos_itens',
      foreignKey: 'codpedido',
    });
  };

  return Pedido;
};
