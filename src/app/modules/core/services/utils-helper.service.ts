import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Layout } from 'src/app/configs/layout-config';

declare const require;
const bowser = require('bowser');

@Injectable({
  providedIn: 'root',
})
export class UtilsHelperService {
  static isPalindrome(str) {
    const len = Math.floor(str.length / 2);
    for (let i = 0; i < len; i++) {
      if (str[i] !== str[str.length - i - 1]) {
        return false;
      }
    }
    return true;
  }

  static isBrowserValid() {
    const browser = bowser.getParser(window.navigator.userAgent);
    return browser.satisfies({
      windows: {
        'internet explorer': '>10',
      },
      macos: {
        safari: '>10.1',
      },
      chrome: '>20.1.1432',
      firefox: '>31',
      opera: '>22',
    });
  }

  traverseSourcePage(page: any = null) {
    const {
      flatControlList,
      controls,
      included,
      parentGroupId,
      parentGroupType,
      parentGroupControlType,
    } = page;
    if (controls) {
      const { type, id, attributes, relationships } = controls;
      if (relationships) {
        // Need a nested traverse
        let iteratableElement = null;
        let isTableComponent = false;
        let hasTableHeader = false;
        let tableHeadersReference = null;
        let groupControlType = 'container';
        let additionalElements = [];
        if (type === 'pgim_fund_page') {
          // seek for children relationships:sections:data:[]
          iteratableElement = relationships?.sections.data;
        } else if (type === 'paragraph--pgim_fund_section') {
          iteratableElement = relationships?.components.data;
          groupControlType = 'section';
        } else if (type === 'paragraph--pgim_fund_menu_component') {
          if (attributes) {
            const { menu_title } = attributes;
            if (menu_title) {
              groupControlType = 'grid';
              // additionalElements.push({
              //   type: 'menu_title',
              //   component: 'h5',
              //   groupControlType,
              //   value: menu_title,
              //   id: `${id}-menu_title`,
              //   parentGroupId: id,
              //   parentGroupType,
              // });
            } else {
              groupControlType = 'list';
            }
          }
          iteratableElement = relationships?.fund_tuples.data;
        } else if (type === 'paragraph--pgim_fund_table_component') {
          groupControlType = 'table';
          iteratableElement = relationships?.fund_table_rows.data;
          tableHeadersReference =
            relationships &&
            relationships.hasOwnProperty('fund_table_row_headers') &&
            relationships.fund_table_row_headers &&
            relationships.fund_table_row_headers.hasOwnProperty('data') &&
            relationships.fund_table_row_headers.data
              ? [relationships.fund_table_row_headers.data]
              : null;
          isTableComponent = true;
          hasTableHeader = tableHeadersReference ? true : false;
        }

        // all group element will have a group id
        flatControlList.push({
          type,
          id,
          attributes,
          parentGroupId,
          parentGroupType,
          groupId: id,
          component: groupControlType,
        });

        if (additionalElements.length > 0) {
          additionalElements.forEach(e => {
            flatControlList.push(e);
          });
        }
        if (
          iteratableElement &&
          iteratableElement.constructor === Array &&
          iteratableElement.length > 0
        ) {
          if (isTableComponent && hasTableHeader) {
            tableHeadersReference.forEach(innerElement => {
              const children = this.fetchGroupChildren(included, innerElement.id);
              if (children && children.length > 0) {
                children.forEach(childElement => {
                  this.traverseSourcePage({
                    flatControlList,
                    included,
                    controls: childElement,
                    parentGroupId: id,
                    parentGroupType: type,
                    parentGroupControlType: groupControlType,
                  });
                });
              }
            });
          }
          iteratableElement.forEach(innerElement => {
            const children = this.fetchGroupChildren(included, innerElement.id);
            if (children && children.length > 0) {
              children.forEach(childElement => {
                this.traverseSourcePage({
                  flatControlList,
                  included,
                  controls: childElement,
                  parentGroupId: id,
                  parentGroupType: type,
                  parentGroupControlType: groupControlType,
                });
              });
            }
          });
        }
      } else {
        // leaf element
        if (type === 'paragraph--pgim_fund_rich_text_component') {
          const { fund_rich_text_title, fund_rich_text } = attributes;
          if (fund_rich_text_title) {
            flatControlList.push({
              type: 'fund_rich_text_title',
              component: 'div',
              groupControlType: parentGroupControlType,
              value: fund_rich_text_title,
              id: `${id}-fund_rich_text_title`,
              parentGroupId,
              parentGroupType,
            });
          }
          if (fund_rich_text) {
            flatControlList.push({
              parentGroupId,
              parentGroupType,
              type: 'fund_rich_text',
              component: 'div',
              groupControlType: parentGroupControlType,
              value: fund_rich_text['value'],
              id: `${id}-fund_rich_text`,
            });
          }
        } else if (type === 'paragraph--pgim_fund_tuple') {
          const { tuple_label, fund_tuple_value } = attributes;
          if (parentGroupControlType === 'grid') {
            // handle as two column table without header
            flatControlList.push({
              type,
              component: 'row',
              groupControlType: parentGroupControlType,
              value: null,
              id,
              groupId: id,
              parentGroupId,
              parentGroupType,
            });
            flatControlList.push({
              type: 'tuple_label',
              component: 'column',
              groupControlType: 'grid',
              value: tuple_label,
              id: `${id}-tuple_label`,
              parentGroupId: id,
              parentGroupType: type,
            });
            flatControlList.push({
              type: 'fund_tuple_value',
              component: 'column',
              groupControlType: 'grid',
              value: fund_tuple_value,
              id: `${id}-fund_tuple_value`,
              parentGroupId: id,
              parentGroupType: type,
            });
          } else {
            flatControlList.push({
              type,
              id,
              parentGroupId,
              parentGroupType,
              component: 'li',
              groupControlType: parentGroupControlType,
              label: tuple_label,
              value: fund_tuple_value,
            });
          }
        } else if (type === 'paragraph--pgim_fund_table_component_row') {
          const columnKeys = Object.keys(attributes);
          flatControlList.push({
            type,
            component: 'tr',
            groupControlType: parentGroupControlType,
            value: null,
            id,
            groupId: id,
            parentGroupId,
            parentGroupType,
          });
          const attributesToIgnore = [
            'drupal_internal__id',
            'drupal_internal__revision_id',
            'parent_id',
          ];
          columnKeys.forEach(e => {
            if (!attributesToIgnore.includes(e)) {
              flatControlList.push({
                type: e,
                component: 'td',
                groupControlType: 'tr',
                value: attributes[e],
                id: `${id}-${e}`,
                parentGroupId: id,
                parentGroupType: type,
              });
            }
          });
        }
      }
    }
  }

  generateNestedStructure(controls: any = [], groupId: any = null, nestedStructureJson: any) {
    if (!controls || controls.constructor !== Array) {
      return;
    }
    // start from root
    const childrenElements = controls.filter(e => e.parentGroupId === groupId);
    childrenElements.forEach(element => {
      if (element.hasOwnProperty('groupId') && element.groupId) {
        const childNestedStructureJson = [];
        this.generateNestedStructure(controls, element.groupId, childNestedStructureJson);
        nestedStructureJson.push({
          ...element,
          children: childNestedStructureJson,
        });
      } else {
        nestedStructureJson.push({
          ...element,
          children: [],
        });
      }
      // console.log('generateNestedStructure ->', element);
    });
  }

  fetchGroupChildren(childDomain: any = [], groupId: any = null) {
    if (!childDomain || !groupId || childDomain.constructor !== Array) {
      return;
    }
    return childDomain.filter(e => e.id && e.id === groupId);
  }

  mapSourceToTarget(pageBase) {
    return new Observable(observer => {
      const { sourceDictionary } = pageBase;
      if (sourceDictionary) {
        const { data, included } = sourceDictionary;
        if (data && data.constructor === Array && data.length > 0) {
          data.forEach(objKey => {
            // console.log('objKey ->', objKey);
            const { attributes } = objKey;
            if (attributes && attributes.hasOwnProperty('title')) {
              pageBase.title = attributes.title;
            }
            const flatControlList = [];
            this.traverseSourcePage({
              flatControlList,
              controls: objKey,
              included,
              groupId: null,
              parentGroupId: null,
              parentGroupType: null,
            });
            pageBase.flatControlList = flatControlList;
            const childNestedStructureJson = [];
            this.generateNestedStructure(flatControlList, null, childNestedStructureJson);
            pageBase.structureControlList = childNestedStructureJson;
          });
        }
      }
      observer.next({
        ...pageBase,
      });
      observer.complete();
    });
  }

  fetchLayoutConfig(configList: any = [], refAttrName: string = '', refValue: any = null) {
    if (!configList || configList.constructor !== Array || !refAttrName) {
      return null;
    }
    const objIndex = configList.findIndex(
      e => e.hasOwnProperty(refAttrName) && e[refAttrName] === refValue
    );
    return objIndex > -1 ? configList[objIndex] : null;
  }

  getLayoutClass(controlConfig){
    if(controlConfig.hasOwnProperty('layout_size') && Layout.classes.hasOwnProperty(controlConfig['layout_size'])){
      return Layout.classes[controlConfig['layout_size']];
    }
  }
}
