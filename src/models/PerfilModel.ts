import * as Sequelize from 'sequelize';
import {BaseModelInterface} from '../interfaces/BaseModelInterface';
import {ModelsInterface} from '../interfaces/ModelsInterface';
import {UsuarioInstance} from "./UsuarioModel";

export interface PerfilAttributes {
    id_perfil?: number;
    nome_perfil?: string;
}

export interface PerfilInstance extends Sequelize.Instance<PerfilAttributes>, PerfilAttributes {
    usuarios: UsuarioInstance;
}

export interface PerfilModel extends BaseModelInterface, Sequelize.Model<PerfilInstance, PerfilAttributes> {
}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PerfilModel => {

    const Perfil: PerfilModel =
        sequelize.define('Perfil', {
            id_perfil: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            nome_perfil: {
                type: DataTypes.STRING(128),
                allowNull: false
            },
        }, {
            schema: 'seguranca',
            tableName: 'perfil',
            timestamps: false
        });

    Perfil.associate = (models: ModelsInterface): void => {
        Perfil.belongsToMany(models.Usuario, {
            as: 'usuarios',
            through: 'usuarios_perfil',
            foreignKey: 'id_perfil',
            otherKey: 'id_usuario',
            timestamps: false
        });
    };

    return Perfil;
};